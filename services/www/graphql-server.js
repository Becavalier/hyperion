const { ApolloServer, ApolloError, gql } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { 
  PostComments, 
  TOVDAccount,
  TOVDToken,
  TOVDAppData,
} = require('./db');
const dayjs = require('dayjs');
const randToken = require('rand-token');
const crypto = require('crypto');
const { TOVDValidateToken } = require('./helpers/tovd');
require('dayjs/locale/zh-cn'); 

const md5 = value => crypto.createHash('md5').update(value).digest('hex');

module.exports = app => {
  const DateScalarType = new GraphQLScalarType({
    name: 'DateScalarType',
    description: 'DateScalarType custom scalar type',
    serialize(value) {
      // timestamp formatted;
      return dayjs(value).locale('zh-cn').format('YYYY-MM-DD HH:mm:ss');
    },
    parseValue(value) {
      // Implement your own behavior here by setting the 'result' variable
      return value;
    },
    parseLiteral(ast) {
      switch (ast.kind) {
        // Implement your own behavior here by returning what suits your needs
        // depending on ast.kind
      }
    }
  });

  var typeDefs = gql`
    type Query {
      postComments(postId: String!): [PostComment]!
      searchPostsByKey(key: String!): [PostSearchResult]!
      searchTagsByKey(key: String!): [TagSearchResult]!
      tovdSignInAccount(credential: TOVDCredential!): HTTPResult!
      tovdSignOutAccount: HTTPResult!
      tovdTokenValidation: HTTPResult!
      tovdRetrieveAppData: HTTPResult!
    }
    type Mutation {
      insertPostComment(comment: CommentInput!): PostComment!
      tovdSyncAppData(TOVDAppData: TOVDAppDataInput!): HTTPResult!
      tovdSignUpAccount(credential: TOVDCredential!): HTTPResult!
      tovdInsertNewRecord(TOVDRecordData: TOVDRecordDataInput!): HTTPResult!
      tovdRemoveRecord(TOVDRecordDataJSON: TOVDRecordDataJSONInput!): HTTPResult!
    }
    scalar DateScalarType
    input TOVDRecordDataJSONInput {
      index: Int!
      data: String!
    }
    input CommentInput {
      postId: String!
      publisher: String!
      content: String!
    }
    input TOVDAppDataInput {
      data: String!
    }
    input TOVDCredential {
      username: String!
      password: String!
    }
    input TOVDRecordDataInput {
      content: String!
      translation: String!
      date: String!
      type: String
      index: Float!  
    }
    type HTTPResult {
      result: Boolean!
      data: String
      token: String
      id: Int
      username: String
    }
    type PostComment {
      id: Int!
      postId: String!
      publisher(id: String): Publisher!
      content: String!
      ipAddr: String
      publishTime: DateScalarType!
    }
    type PostSearchResult {
      title: String!
      url: String!
      date: DateScalarType!
      rawDate: String!
    }
    type TagSearchResult {
      tagName: String!
    }
    type Publisher {
      name: String!
      gender: Gender!
    }
    enum Gender {
      MALE
      FEMALE
    }
  `;

  const resolvers = {
    Query: {
      async postComments(parent, args) {
        return await PostComments.findAll({
          where: {
            postId: args.postId
          },
          order: [
            ['publishTime', 'DESC'],
          ]
        });
      },
      async searchPostsByKey(parent, args) {
        const key = args.key;
        const reg = new RegExp(`${key}`, 'i');
        return global.hexoMeta.Post.filter(post => {       
          return reg.test(post.raw) || reg.test(post.title)
        }).map(candidate => {
          const localDate = dayjs(candidate.date).locale('zh-cn').format('YYYY-MM-DD');
          return {
            title: candidate.title,
            url: `/${localDate.replace(/-/g, '/')}/${candidate.slug}`,
            date: candidate.date,
            rawDate: candidate.date
          }
        });
      },
      async searchTagsByKey(parent, args) {
        const key = args.key;
        const reg = new RegExp(`${key}`, 'i');
        return global.hexoMeta.Tag.filter(tag => {       
          return reg.test(tag.name)
        }).map(candidate => {
          return {
            tagName: candidate.name,
          }
        });
      },
      async tovdTokenValidation(parent, args, context) {
        const { token } = context;
        try {
          return await TOVDValidateToken(token);
        } catch(e) {
          console.error(e);
          return {
            result: false,
          }
        }
      },
      async tovdSignOutAccount(parent, args, context) {
        const { token } = context;
        try {
          const rows = await TOVDToken.destroy({
            where: {
              token,
            },
          });
          // return the number of deleted rows;
          if (rows > 0) {
            return {
              result: true,
            }
          }
        } catch(e) {
          console.error(e);
          return {
            result: false,
          }
        }
      },
      async tovdSignInAccount(parent, args, context) {
        const { username, password } = args.credential;
        try {
          const profile = await TOVDAccount.findOne({
            where: {
              username,
              password: md5(password),
            },
          });
          if (profile && Object.keys(profile).length > 0) {
            // regenerate token;
            const token = randToken.uid(64);
            await TOVDToken.upsert({
              id: profile.id,
              token,
              expiry_at: dayjs().add(1, 'year').format('YYYY-MM-DD hh:mm:ss'),
            });
            return {
              result: true,
              id: profile.id,
              username: profile.username,
              token,
            }
          } else {
            return { result: false }
          }
        } catch(e) {
          console.error(e);
          return {
            result: false,
          }
        }
      },
      async tovdRetrieveAppData(parent, args, context) {
        const { token } = context;
        try {
          const { result, id } = await TOVDValidateToken(token);
          if (result) {
            const res = await TOVDAppData.findOne({
              where: { id },
            });
            return {
              result: true,
              data: res ? res.data : '{}',
            }
          } else {
            return { result: false }
          }
        } catch(e) {
          console.error(e);
          return {
            result: false,
          }
        }
      }
    },
    Mutation: {
      async insertPostComment(parent, args, context) {
        const publishTime = new Date();
        let comment = args.comment;
        if (comment.publisher === '@@') {
          comment.publisher = 'YHSPY（博主）';
        } else if (comment.publisher.includes('YHSPY') || comment.publisher.includes('博主')) {
          throw new ApolloError('Sorry, submit failed! Please re-check your input params.');
        }
        const result = await PostComments.create({
          ...comment,
          ipAddr: context.ipAddr,
          publishTime,
        });
        return result;
      },
      async tovdSyncAppData(parent, args, context) {
        const { token } = context;
        try {
          const { result, id } = await TOVDValidateToken(token);
          if (result) {
            const { data } = args.TOVDAppData;
            await TOVDAppData.upsert({
              data, id,
            });
            return { result: true };
          } else {
            return { result: false };
          }
        } catch(e) {
          console.error(e);
          return { result: false };
        }
      },
      async tovdInsertNewRecord(parent, args, context) {
        const { token } = context;
        try {
          const { result, id } = await TOVDValidateToken(token);
          if (result) {
            const record = args.TOVDRecordData;
            const db = (await TOVDAppData.findOne({ where: { id }})).data;
            const position = -2;
            const data = [db.slice(0, position), `${db.length <= 27 ? '' : ','}${JSON.stringify(record)}`, db.slice(position)].join('');
            await TOVDAppData.upsert({ data, id });
            return { result: true };
          } else {
            return { result: false };
          }
        } catch(e) {
          console.error(e);
          return { result: false };
        }
      },
      async tovdRemoveRecord(parent, args, context) {
        const { token } = context;
        try {
          const { result, id } = await TOVDValidateToken(token);
          if (result) {
            const { index, data } = args.TOVDRecordDataJSON;
            const db = (await TOVDAppData.findOne({ where: { id }})).data;
            await TOVDAppData.upsert({ data: db.replace(new RegExp(index === 0 ? `${data},?` : `,?${data}`), ''), id });
            return { result: true };
          } else {
            return { result: false };
          }
        } catch(e) {
          console.error(e);
          return { result: false };
        }
      },
      async tovdSignUpAccount(parent, args, context) {
        const { username, password } = args.credential;
        try {
          const profile = await TOVDAccount.findOne({
            where: {
              username,
            },
          });
          if (profile && Object.keys(profile).length > 0) {
            return { result: false };
          } else {
            // create account;
            const record = await TOVDAccount.create({
              username, 
              password: md5(password),
            });
            // regenerate token;
            const token = randToken.uid(64);
            await TOVDToken.create({
              id: record.id,
              token,
              expiry_at: dayjs().add(1, 'year').format('YYYY-MM-DD hh:mm:ss'),
            });
            return {
              result: true,
              id: record.id,
              username: record.username,
              token,
            };
          }
        } catch(e) {
          console.error(e);
          return { result: false };
        }
      },
    },
    DateScalarType,
    PostComment: {
      publisher(parent) {
        return {
          name: parent.publisher,
          gender: 'MALE'
        }
      }
    }
  };
  

  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => ({
      token: req.get('token'),
      ipAddr: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    }),
    formatError: error => {
      console.error(error);
      return error;
    },
    formatResponse: response => {
      console.log(response);
      return response;
    },
  });
  server.applyMiddleware({ app });
};

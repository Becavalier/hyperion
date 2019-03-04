const { ApolloServer, ApolloError, gql } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { PostComments } = require('./db');
const dayjs = require('dayjs');
require('dayjs/locale/zh-cn'); 

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
    scalar DateScalarType

    input CommentInput {
      postId: String!
      publisher: String!
      content: String!
    }

    type Query {
      postComments(postId: String!): [PostComment]!
      searchPostsByKey(key: String!): [PostSearchResult]!
      searchTagsByKey(key: String!): [TagSearchResult]!
    }
    type Mutation {
      insertPostComment(comment: CommentInput!): PostComment!
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

  var resolvers = {
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
        let result = await PostComments.create({
          ...comment,
          ipAddr: context.ipAddr,
          publishTime,
        });
        return result;
      }
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
      ipAddr: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    })
  });
  server.applyMiddleware({ app });

};

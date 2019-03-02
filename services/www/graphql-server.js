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

    type Query {
      postComments(postId: String!): [PostComment]!
    }
    type Mutation {
      insertPostComment(postId: String!, publisher: String!, content: String!): PostComment!
    }
    type PostComment {
      id: Int,
      postId: String,
      publisher: String,
      content: String,
      ipAddr: String,
      publishTime: DateScalarType
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
      }
    },
    Mutation: {
      async insertPostComment(parent, args, context) {
        const publishTime = new Date();
        if (args.publisher === '@@') {
          args.publisher = 'YHSPY（博主）';
        } else if (args.publisher.includes('YHSPY') || args.publisher.includes('博主')) {
          throw new ApolloError('Sorry, submit failed! Please re-check your input params.');
        }
        let result = await PostComments.create({
          ...args,
          ipAddr: context.ipAddr,
          publishTime,
        });
        return result;
      }
    },
    DateScalarType
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

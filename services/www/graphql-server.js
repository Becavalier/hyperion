const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const { PostComments } = require('./db');

module.exports = (app, isProd) => {

  app.use('/graphql', graphqlHTTP(async (request, response, graphQLParams) => ({
    schema: buildSchema(`
      type Query {
        postComments(postId: Int!): [PostComment]!
      }
      type Mutation {
        insertPostComment(postId: Int!, publisher: String!, content: String!): PostComment!
      }
      type PostComment {
        id: Int,
        postId: Int,
        publisher: String,
        content: String,
        ipAddr: String,
        publishTime: Float
      }
    `),
    rootValue: { 
      postComments: async (args) => {
        return await PostComments.findAll({
          where: {
            postId: args.postId
          }
        });
      },
      insertPostComment: async (args) => {
        let result = await PostComments.create({
          ...args,
          ipAddr: request.headers['x-forwarded-for'] || request.connection.remoteAddress,
          publishTime: new Date()
        });
        // transform to timestamp;
        result.publishTime = new Date(result.publishTime).getTime();
        return result;
      }
    },
    graphiql: !isProd,
  })));

};

/* eslint-disable no-extra-parens */
const { ApolloServer } = require('apollo-server'),
  config = require('./config'),
  migrationsManager = require('./migrations'),
  logger = require('./app/logger'),
  schema = require('./app/graphql');
// const { verifyToken } = require('./app/helpers/token');

const port = config.common.api.port || 8080;

migrationsManager
  .check()
  .then(() =>
    /* const rollbar = new Rollbar({
      accessToken: config.common.rollbar.accessToken,
      enabled: !!config.common.rollbar.accessToken,
      environment: config.common.rollbar.environment || config.environment
    }); */
    new ApolloServer({
      schema
      // ,
      // context: ({ req }) => {
      //   const token =
      //     req.headers.authorization ||
      //     '' ||
      //     (req.body && req.body.access_token) ||
      //     (req.query && req.query.access_token) ||
      //     req.headers['x-access-token'];

      //   const user = verifyToken(token);
      //   return { user };
      // }
    })
      .listen(port)
      .then(({ url, subscriptionsUrl }) => {
        logger.info(`🚀 Server ready at ${url}`);
        logger.info(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
      })
  )
  .catch(logger.error);

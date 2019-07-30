const { queries, schema: queriesSchema } = require('./queries');
const { albumFieldResolvers } = require('./resolvers');

module.exports = {
  queries,
  schemas: [queriesSchema],
  albumFieldResolvers
};

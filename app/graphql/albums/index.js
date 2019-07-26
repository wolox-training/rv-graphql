const { queries, schema: queriesSchema } = require('./queries');
const { albumFieldResolvers, photoFieldResolvers } = require('./resolvers');

module.exports = {
  queries,
  schemas: [queriesSchema],
  albumFieldResolvers,
  photoFieldResolvers
};

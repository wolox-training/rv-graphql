const { queries, schema: queriesSchema } = require('./queries'),
  { mutations, schema: mutationSchema } = require('./mutations'),
  { subscriptions, schema: subscriptionsSchema } = require('./subscriptions'),
  { userFieldResolvers } = require('./resolvers');

module.exports = {
  queries,
  mutations,
  subscriptions,
  schemas: [queriesSchema, mutationSchema, subscriptionsSchema],
  userFieldResolvers
};

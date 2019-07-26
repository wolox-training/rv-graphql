const { gql } = require('apollo-server');
const { albumQueryResolver, albumsQueryResolver } = require('./resolvers');

module.exports = {
  queries: {
    album: albumQueryResolver,
    albums: albumsQueryResolver
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album!
      albums(page: Int, limit: Int, sortingKey: String, sortingOrder: String): [Album]
    }
  `
};

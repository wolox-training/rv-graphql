const { gql } = require('apollo-server');
const { albumQueryResolver, albumsQueryResolver } = require('./resolvers');

module.exports = {
  queries: {
    album: (_, params) => albumQueryResolver(params),
    albums: (_, params) => albumsQueryResolver(params)
  },
  schema: gql`
    extend type Query {
      album(id: ID!): Album!
      albums(
        page: Int
        limit: Int
        sortingKey: String
        sortingOrder: String
        filteringString: String
      ): [Album]
    }
  `
};

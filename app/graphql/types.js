const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    id: ID!
    name: String
    firstName: String @deprecated(reason: "Fused with lastName into name.")
    lastName: String @deprecated(reason: "Fused with firstName into name.")
    username: String!
    email: String!
    password: String!
    albums: [Album]
  }
  type AccessToken {
    accessToken: String!
    refreshToken: String!
    expiresIn: Int!
  }
  type Album {
    id: ID!
    originalAlbumId: Int!
    originalUserId: Int!
    title: String!
    photos: [Photo!]
  }
  type Photo {
    id: ID!
    albumId: Int!
    url: String!
    thumbnailUrl: String!
  }
`;

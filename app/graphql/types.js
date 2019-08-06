const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    name: String
    firstName: String @deprecated(reason: "Fused with lastName into name.")
    lastName: String @deprecated(reason: "Fused with firstName into name.")
    username: String!
    email: String!
    password: String!
    id: ID!
  }
  type AccessToken {
    accessToken: String!
    expiresIn: Int!
  }
  type Album {
    userId: Int!
    title: String!
    photos: [Photo!]
    id: ID!
  }
  type Photo {
    albumId: Int!
    id: ID!
    url: String!
    thumbnailUrl: String!
  }
  type Token {
    auth: Boolean!
    token: String!
  }
`;

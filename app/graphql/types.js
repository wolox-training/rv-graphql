const { gql } = require('apollo-server');

module.exports = gql`
  type Query
  type Mutation
  type Subscription
  type User {
    # ---------------------------------------------------------------------------------------------------------------
    # Now, instead of using the firstName and lastName fields, the name field should be used. To ensure backward
    # compatibility and not introduce breaker changes, it will continue to be saved in the database as firstName
    # and lastName so that the last word of name will be lastName and all the rest will be firstName. This conversion
    # is already implemented.
    # Instead of:
    # firstName: Wolfgang Amadeus
    # lastName: Mozart
    # We should do:
    # name: Wolfgang Amadeus Mozart
    # And it will be saved like it would have done before.
    # ---------------------------------------------------------------------------------------------------------------
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
    refreshToken: String!
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
`;

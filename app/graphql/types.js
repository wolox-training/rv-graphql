const { gql } = require('apollo-server');

module.exports = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
  directive @cacheControl(maxAge: Int, scope: CacheControlScope) on FIELD_DEFINITION | OBJECT | INTERFACE

  type Query
  type Mutation
  type Subscription
  type User @cacheControl(maxAge: 1000) {
    id: ID!
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
    name: String @cacheControl(maxAge: 1000)
    firstName: String @deprecated(reason: "Fused with lastName into name.")
    lastName: String @deprecated(reason: "Fused with firstName into name.")
    username: String!
    email: String!
    password: String!
    albums: [Album] @cacheControl(maxAge: 1000)
  }
  type AccessToken {
    accessToken: String!
    expiresIn: Int!
  }
  type Album @cacheControl(maxAge: 1000) {
    id: ID!
    originalAlbumId: Int!
    originalUserId: Int!
    title: String!
    photos: [Photo!] @cacheControl(maxAge: 5)
    owners: [User]
  }
  type Photo {
    id: ID!
    albumId: Int!
    url: String!
    thumbnailUrl: String!
  }
`;

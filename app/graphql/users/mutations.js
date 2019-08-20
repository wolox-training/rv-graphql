const { gql } = require('apollo-server'),
  { createUser } = require('../../services/users'),
  { signInQuery } = require('../../services/signInQuery'),
  { buyAlbumForUser } = require('../../services/buyAlbum');

module.exports = {
  mutations: {
    createUser: (_, { user }) => createUser(user),
    login: (_, { credentials }) => signInQuery(credentials),
    buyAlbum: (_, { albumId }, context) => buyAlbumForUser(albumId, context)
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User!
      login(credentials: LoginInput!): AccessToken
      buyAlbum(albumId: Int!): Album
    }
  `
};

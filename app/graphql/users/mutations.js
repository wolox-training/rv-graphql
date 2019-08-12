const { gql } = require('apollo-server'),
  { createUser } = require('../../services/users');
const { signInQuery } = require('../../services/signInQuery');
const { buyAlbumForUser } = require('../../services/buyAlbum');

module.exports = {
  mutations: {
    createUser: (_, { user }) => createUser(user),
    login: (_, { credentials }) => signInQuery(credentials),
    buyAlbum: (_, { albumId, user }) => buyAlbumForUser(albumId, user)
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User!
      login(credentials: LoginInput!): AccessToken
      buyAlbum(albumId: Int!, user: UserInput!): Album
    }
  `
};

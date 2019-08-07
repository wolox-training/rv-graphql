const { gql } = require('apollo-server'),
  { createUser } = require('../../services/users');
const { signInQuery } = require('../../services/signInQuery');
const { buyAlbum } = require('../../services/buyAlbum');

module.exports = {
  mutations: {
    createUser: (_, { user }) => createUser(user),
    login: (_, { credentials }) => signInQuery(credentials),
    buyAlbum: (_, { albumId }) => buyAlbum(albumId)
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User!
      login(credentials: LoginInput!): AccessToken
      buyAlbum(albumId: ): Album
    }
  `
};

const { gql } = require('apollo-server'),
  { createUser } = require('../../services/users');
const { signInQuery } = require('../../services/signInQuery');

module.exports = {
  mutations: {
    createUser: (_, { user }) => createUser(user),
    login: (_, { credentials }) => signInQuery(credentials)
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User!
      login(credentials: LoginInput!): AccessToken
    }
  `
};

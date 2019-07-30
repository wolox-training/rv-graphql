const { gql } = require('apollo-server'),
  { userLoggedIn } = require('../events'),
  { createUserMethod } = require('../../services/users');

module.exports = {
  mutations: {
    createUser: createUserMethod,
    login: (_, { credentials }) => {
      // IMPORTANT: Not a functional login, its just for illustrative purposes
      userLoggedIn.publish(credentials.username);
      return {
        accessToken: 'example_token',
        refreshToken: 'example_refresh_token',
        expiresIn: 134567899123
      };
    }
  },
  schema: gql`
    extend type Mutation {
      createUser(user: UserInput!): User!
      login(credentials: LoginInput!): AccessToken
    }
  `
};

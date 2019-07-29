const { encryptPassword } = require('../../helpers/encryption');
const logger = require('../../logger/index');

const { gql } = require('apollo-server'),
  { userLoggedIn } = require('../events'),
  { user: User } = require('../../models');

module.exports = {
  mutations: {
    createUser: (_, { user }) => {
      user.password = encryptPassword(user.password);
      return User.createModel(user)
        .then(result => {
          logger.info(
            `The user ${user.firstName} ${user.lastName} was successfully created ${JSON.stringify(result)}`
          );
        })
        .catch(error => {
          console.log('holass');
          // logger.error(
          //   `There were errors when adding the user ${user.firstName} ${user.lastName}: ${JSON.stringify(
          //     error
          //   )}`
          // );
        });
    },
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

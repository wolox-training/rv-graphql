/* eslint-disable curly */
const { users: User } = require('../models');
const { checkPassword } = require('../helpers/encryption');
const { signToken } = require('../helpers/token');
const { get } = require('lodash');

const areCredentialsPresent = user => {
  const errors = [];
  if (!user.username) errors.push('No input username!');
  if (!user.password) errors.push('No input password!');
  return errors;
};

const isLoginValid = async user => {
  const { username, password } = user;
  const obtainedUser = await User.getByUsername(username);
  const errors = [];

  if (!obtainedUser) {
    errors.push(`The username: ${username} is not registered.`);
    return errors;
  }

  if (!checkPassword(password, get(obtainedUser, 'dataValues.password')))
    errors.push(`The password for the user with the username: ${username} was wrong.`);

  return errors;
};

const signIn = user => {
  const { username } = user;
  return signToken(username);
};

module.exports = { areCredentialsPresent, isLoginValid, signIn };

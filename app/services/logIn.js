/* eslint-disable curly */
const { user: User } = require('../models');
const { checkPassword } = require('../helpers/encryption');
const { unauthorized, badRequest } = require('../errors');
const { signToken } = require('../helpers/token');

const areCredentialsPresent = user => {
  if (!user.username) return badRequest('No input username!');
  if (!user.password) return badRequest('No input password!');
  return 0;
};

const isLoginValid = async user => {
  const { username, password } = user;
  const obtainedUser = await User.getByUsername(username);

  if (!obtainedUser) return unauthorized(`The username: ${username} is not registered.`);
  if (!checkPassword(password, obtainedUser.dataValues.password))
    return unauthorized(`The password for the user with the username: ${username} was wrong.`);
  return 0;
};

const signIn = user => {
  const { username } = user;
  return signToken(username);
};

module.exports = { areCredentialsPresent, isLoginValid, signIn };

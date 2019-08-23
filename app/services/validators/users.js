/* eslint-disable curly */
const { user: User } = require('../../models');
const { checkPassword } = require('../../helpers/encryption');
const { get } = require('lodash');

// eslint-disable-next-line no-useless-escape
const regexValidEmail = /^([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)@wolox.(com\.ar|cl)$/;
const regexAlphanumeric = /^[a-zA-Z0-9]*$/;

const isPasswordLenghtvalid = password => password.length > 7;
const isPasswordAlphanumeric = password => regexAlphanumeric.test(password);
const isEmailValid = email => regexValidEmail.test(email);

const validateEmailAndPassword = user => {
  const { email, password } = user;
  const errors = [];
  if (!isPasswordLenghtvalid(password)) errors.push('Password too short!');
  if (!isPasswordAlphanumeric(password)) errors.push('Password is not alphanumeric!');
  if (!isEmailValid(email)) errors.push('Email not valid!');
  return { errors };
};

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

  if (!checkPassword(password, get(obtainedUser, 'dataValues.password', [])))
    errors.push(`The password for the user with the username: ${username} was wrong.`);

  return errors;
};

module.exports = { validateEmailAndPassword, areCredentialsPresent, isLoginValid };

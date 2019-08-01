/* eslint-disable curly */
const { user: User } = require('../models'),
  logger = require('../logger/index'),
  { encryptPasswordAsync } = require('../helpers/encryption');
const { validateEmailAndPasswordError } = require('./validators/users');

const createUser = async user => {
  try {
    validateEmailAndPasswordError(user);
    const encryptedPassword = await encryptPasswordAsync(user.password);
    user.password = encryptedPassword;
    const createdUser = await User.createModel(user);
    logger.info(
      `The user ${user.firstName} ${user.lastName} was successfully created ${JSON.stringify(createdUser)}`
    );
    return createdUser;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

module.exports = { createUser };

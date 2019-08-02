/* eslint-disable curly */
const { encryptPasswordAsync } = require('../helpers/encryption');
const logger = require('../logger/index');
const { user: User } = require('../models');
const { validateEmailAndPassword } = require('./validators/users');
const { defaultError } = require('../errors');

const createUser = async user => {
  try {
    const validationErrors = validateEmailAndPassword(user).errors;
    if (validationErrors.length) {
      throw defaultError(validationErrors);
    }

    const encryptedPassword = await encryptPasswordAsync(user.password);
    user.password = encryptedPassword;
    const createdUser = await User.createModel(user);
    logger.info(
      `The user ${user.firstName} ${user.lastName} was successfully created ${JSON.stringify(createdUser)}`
    );
    return createdUser;
  } catch (error) {
    logger.error(error);
    return defaultError(error);
  }
};

module.exports = { createUser };

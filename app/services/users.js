/* eslint-disable curly */
const { encryptPasswordAsync } = require('../helpers/encryption');
const logger = require('../logger/index');
const { user: User } = require('../models');

const createUserMethod = async (_, { user }) => {
  try {
    const encryptedPassword = await encryptPasswordAsync(user.password);
    user.password = encryptedPassword;
    const createdUser = await User.createModel(user);
    logger.info(
      `The user ${user.firstName} ${user.lastName} was successfully created ${JSON.stringify(createdUser)}`
    );
    return createdUser;
  } catch (error) {
    logger.error(error.name);
    error.errors.forEach(element => {
      logger.error(element.message);
    });
    return error;
  }
};

module.exports = { createUserMethod };

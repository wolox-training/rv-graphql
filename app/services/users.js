/* eslint-disable curly */
const { encryptPassword } = require('../helpers/encryption');
const logger = require('../logger/index');
const { user: User } = require('../models');

const createUserMethod = async (_, { user }) => {
  try {
    user.password = encryptPassword(user.password);
    const createdUser = await User.createModel(user);
    logger.info(
      `The user ${user.firstName} ${user.lastName} was successfully created ${JSON.stringify(createdUser)}`
    );
    return createdUser;
  } catch (error) {
    logger.error(error.name)
    error.errors.forEach(element => {
      logger.error(element.message);
    });
    return error;
  }
};

module.exports = { createUserMethod };

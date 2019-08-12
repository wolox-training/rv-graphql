/* eslint-disable curly */
const { encryptPasswordAsync } = require('../helpers/encryption');
const logger = require('../logger/index');
const { user: User } = require('../models');
const { validateEmailAndPassword } = require('./validators/users');
const { defaultError } = require('../errors');
const { badRequest } = require('../errors');
const { splitName } = require('../helpers/deprecation');

const createUser = async user => {
  try {
    const validationErrors = validateEmailAndPassword(user).errors;

    if (validationErrors.length) return defaultError(validationErrors);
    if (!user.name && !(user.firstName && user.firstName))
      return badRequest('The name of the user was not formulated correctly');

    const encryptedPassword = await encryptPasswordAsync(user.password);
    user.password = encryptedPassword;

    if (user.name) {
      const splittedName = splitName(user.name);
      user.firstName = splittedName.firstName;
      user.lastName = splittedName.lastName;
      delete user.name;
    }

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

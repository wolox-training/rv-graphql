/* eslint-disable curly */
const { user: User } = require('../models'),
  logger = require('../logger/index'),
  { encryptPasswordAsync } = require('../helpers/encryption');
const { validateEmailAndPasswordError } = require('./validators/users');
const { badRequest } = require('../errors');

const splitName = string => {
  const words = string.split(' ');
  const nWords = words.length;
  return { firstName: words.slice(0, nWords - 1).join(), lastName: words[nWords - 1] };
};

const createUser = async user => {
  try {
    validateEmailAndPasswordError(user);

    if (!user.name && !(user.firstName && user.firstName)) {
      throw badRequest('The name of the user was not formulated correctly');
    }

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

    return error;
  }
};

module.exports = { createUser };

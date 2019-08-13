/* eslint-disable curly */
const { encryptPasswordAsync } = require('../helpers/encryption');
const logger = require('../logger/index');
const { users: User } = require('../models');
const { albums: Album } = require('../models');
const { validateEmailAndPassword } = require('./validators/users');
const { badRequest, internalServerError } = require('../errors');
const { splitName } = require('../helpers/deprecation');
const { signToken } = require('../helpers/token');

const createUser = async user => {
  try {
    const validationErrors = validateEmailAndPassword(user).errors;

    if (validationErrors.length) return internalServerError(validationErrors);
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

    const createdUser = await User.createModel(user, {
      include: [{ model: Album, as: 'albums', through: { attributes: [] } }]
    });
    logger.info(
      `The user ${user.firstName} ${user.lastName} was successfully created ${JSON.stringify(createdUser)}`
    );

    return createdUser;
  } catch (error) {
    logger.error(error);
    return internalServerError(error);
  }
};

const signIn = user => {
  const { username } = user;
  return signToken(username);
};

module.exports = { createUser, signIn };

/* eslint-disable curly */
const { areCredentialsPresent, isLoginValid, signIn } = require('../services/logIn');
const { JWT_EXPIRATION_TIME } = require('../../config/environment');
const { internalServerError, badRequest, unauthorized } = require('../errors');
const logger = require('../logger/index');
const { userLoggedIn } = require('../graphql/events');

const signInQuery = async credentials => {
  try {
    const presentCredentialsErrors = areCredentialsPresent(credentials);
    if (presentCredentialsErrors.length) return badRequest(presentCredentialsErrors);

    const validLoginErrors = await isLoginValid(credentials);
    if (validLoginErrors.length) return unauthorized(validLoginErrors);

    userLoggedIn.publish(credentials.username);
    return {
      accessToken: signIn(credentials),
      refreshToken: 'example_refresh_token',
      expiresIn: JWT_EXPIRATION_TIME
    };
  } catch (error) {
    logger.error(error);
    return internalServerError(error);
  }
};

module.exports = { signInQuery };

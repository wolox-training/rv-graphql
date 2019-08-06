const { areCredentialsPresent, isLoginValid, signIn } = require('../services/logIn');
const { JWT_EXPIRATION_TIME } = require('../../config/environment');
const { internalServerError } = require('../errors');
const logger = require('../logger/index');
const { userLoggedIn } = require('../graphql/events');

const signInQuery = async credentials => {
  try {
    areCredentialsPresent(credentials);
    await isLoginValid(credentials);
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

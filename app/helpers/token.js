const jwt = require('jsonwebtoken');
const { secret } = require('../../config/constants');
const logger = require('../logger');
const { JWT_EXPIRATION_TIME } = require('../../config/environment');

const signToken = username => jwt.sign({ username }, secret, { expiresIn: parseInt(JWT_EXPIRATION_TIME) });

const verifyToken = token => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    logger.error(error);
    return { errors: ['Unauthorized'] };
  }
};

module.exports = { signToken, verifyToken };

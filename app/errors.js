const { ApolloError } = require('apollo-server');

const createError = (message, statusCode) => new ApolloError(message, statusCode);

const BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500;

exports.badRequest = message => createError(message, BAD_REQUEST);
exports.unauthorized = message => createError(message, UNAUTHORIZED);
exports.internalServerError = message => createError(message, INTERNAL_SERVER_ERROR);

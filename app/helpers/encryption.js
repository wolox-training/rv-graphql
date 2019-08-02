/* eslint-disable curly */
const bcrypt = require('bcryptjs');
const { saltValue } = require('../../config/constants');
const { defaultError } = require('../errors');

const salt = bcrypt.genSaltSync(saltValue);

const encryptPassword = password => bcrypt.hashSync(password, salt);
const encryptPasswordAsync = password =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) return reject(defaultError('Encryption Failed'));
      return resolve(hash);
    });
  });

const checkPassword = (plaintextPassword, hashedPassword) =>
  bcrypt.compareSync(plaintextPassword, hashedPassword);

module.exports = { encryptPassword, checkPassword, encryptPasswordAsync };

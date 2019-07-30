/* eslint-disable curly */
const bcrypt = require('bcryptjs');

const saltValue = 10;
const salt = bcrypt.genSaltSync(saltValue);

const encryptPassword = password => bcrypt.hashSync(password, salt);
const encryptPasswordAsync = password =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });

const checkPassword = (plaintextPassword, hashedPassword) =>
  bcrypt.compareSync(plaintextPassword, hashedPassword);

module.exports = { encryptPassword, checkPassword, encryptPasswordAsync };

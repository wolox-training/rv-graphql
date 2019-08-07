'use strict';
const { encryptPassword } = require('../app/helpers/encryption');
const mySuperPassword = 'mySuperPassword';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          username: 'theJohnDoe',
          email: 'john.doe@wolox.com.ar',
          password: encryptPassword(mySuperPassword),
          created_at: '2016-06-22 19:10:25-07',
          updated_at: '2016-06-22 19:10:25-07',
          deleted_at: null
        }
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('users')
};

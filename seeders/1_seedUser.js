'use strict';
const { encryptPassword } = require('../app/helpers/encryption');
const mySuperPassword = 'mySuperPassword';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'User',
      [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          username: 'theJohnDoe',
          email: 'john.doe@wolox.com.ar',
          password: encryptPassword(mySuperPassword),
          createdAt: '2016-06-22 19:10:25-07',
          updatedAt: '2016-06-22 19:10:25-07',
          deletedAt: '2016-06-22 19:10:25-07'
        }
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('User')
};

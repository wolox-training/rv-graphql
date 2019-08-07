'use strict';
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'UserAlbums',
      [
        {
          id: 1,
          userId: 1,
          albumId: 1,
          createdAt: '2016-06-22 19:10:25-07',
          updatedAt: '2016-06-22 19:10:25-07',
          deletedAt: '2016-06-22 19:10:25-07'
        }
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('UserAlbums')
};

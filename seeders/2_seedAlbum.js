'use strict';
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Album',
      [
        {
          id: 1,
          originalAlbumId: 26,
          originalUserId: 34,
          title: 'asdflasdfj',
          createdAt: '2016-06-22 19:10:25-07',
          updatedAt: '2016-06-22 19:10:25-07',
          deletedAt: '2016-06-22 19:10:25-07'
        }
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('Albums')
};

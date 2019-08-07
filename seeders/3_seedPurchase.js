'use strict';
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'userAlbums',
      [
        {
          id: 1,
          user_id: 1,
          album_id: 1,
          created_at: '2016-06-22 19:10:25-07',
          updated_at: '2016-06-22 19:10:25-07',
          deleted_at: null
        }
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('userAlbums')
};

'use strict';
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'albums',
      [
        {
          id: 1,
          original_album_id: 26,
          original_user_id: 34,
          title: 'asdflasdfj',
          created_at: '2016-06-22 19:10:25-07',
          updated_at: '2016-06-22 19:10:25-07',
          deleted_at: '2016-06-22 19:10:25-07'
        }
      ],
      {}
    ),
  down: queryInterface => queryInterface.bulkDelete('albums')
};

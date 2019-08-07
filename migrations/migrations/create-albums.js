'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('albums', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      originalAlbumId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'original_album_id'
      },
      originalUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'original_user_id'
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE
    }),
  down: queryInterface => queryInterface.dropTable('albums')
};

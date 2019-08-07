'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('UserAlbums', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // field: 'user_id',
        references: {
          model: 'User',
          key: 'id',
          as: 'userId'
        }
      },
      albumId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // field: 'album_id',
        references: {
          model: 'Album',
          key: 'id',
          as: 'albumId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('UserAlbums')
};

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('user_albums', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      albumId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'album_id',
        references: {
          model: 'albums',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE
      },
      deletedAt: {
        // allowNull: false,
        field: 'deleted_at',
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('user_albums')
};

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
        field: 'original_album_id',
        allowNull: false
      },
      originalUserId: {
        type: Sequelize.INTEGER,
        field: 'original_user_id',
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
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
        field: 'deleted_at',
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('albums')
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAlbums = sequelize.define(
    'userAlbums',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'album_id',
        references: {
          model: 'albums',
          key: 'id'
        }
      }
    },
    {
      tableName: 'user_albums',
      paranoid: true,
      underscored: true
    }
  );
  return UserAlbums;
};

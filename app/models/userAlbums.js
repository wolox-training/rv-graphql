'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAlbums = sequelize.define(
    'UserAlbums',
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
        // field: 'user_id',
        references: {
          model: 'User',
          key: 'id',
          as: 'userId'
        }
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // field: 'album_id',
        references: {
          model: 'Albums',
          key: 'id',
          as: 'albumId'
        }
      }
    },
    {}
  );
  return UserAlbums;
};

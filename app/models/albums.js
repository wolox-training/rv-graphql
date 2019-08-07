'use strict';
module.exports = (sequelize, DataTypes) => {
  const Albums = sequelize.define(
    'albums',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      originalAlbumId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'original_album_id'
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  Albums.associate = models => {
    Albums.belongsToMany(models.User, {
      through: 'UserAlbums',
      as: 'users',
      foreignKey: 'album_id'
    });
  };
  return Albums;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      originalAlbumId: {
        type: DataTypes.INTEGER,
        // field: 'original_album_id',
        allowNull: false
      },
      originalUserId: {
        type: DataTypes.INTEGER,
        // field: 'original_user_id',
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );

  Album.associate = models => {
    Album.belongsToMany(models.User, {
      as: 'users',
      through: models.UserAlbums,
      foreignKey: 'albumId'
    });
  };

  Album.getOne = album => Album.findOne({ where: album });

  Album.getAll = () => Album.findAll();

  Album.getByTitle = title => Album.getOne({ title });

  return Album;
};

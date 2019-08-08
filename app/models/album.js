'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    originalAlbumId: DataTypes.INTEGER,
    originalUserId: DataTypes.INTEGER,
    title: DataTypes.STRING
  });

  Album.associate = models => {
    Album.belongsToMany(models.User, {
      as: 'users',
      through: 'UserAlbums',
      foreignKey: 'albumId'
    });
  };

  Album.getOne = album => Album.findOne({ where: album });

  Album.getAll = () => Album.findAll();

  Album.getByTitle = title => Album.getOne({ title });

  return Album;
};

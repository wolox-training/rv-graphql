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
      originalUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'original_user_id'
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

  Albums.getOne = album => Albums.findOne({ where: album });

  Albums.getAll = () => Albums.findAll();

  Albums.getByTitle = title => Albums.getOne({ title });

  return Albums;
};

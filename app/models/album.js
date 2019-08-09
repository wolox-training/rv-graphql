'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'albums',
    {
      originalAlbumId: {
        type: DataTypes.INTEGER,
        field: 'original_album_id'
      },
      originalUserId: {
        type: DataTypes.INTEGER,
        field: 'original_user_id'
      },
      title: DataTypes.STRING,
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
      deletedAt: { type: DataTypes.DATE, field: 'deleted_at' }
    },
    {
      tableName: 'albums',
      // paranoid: true,
      underscored: true
    }
  );

  Album.associate = models => {
    Album.belongsToMany(models.users, {
      through: 'user_albums',
      as: 'users',
      foreignKey: 'albumId'
    });
  };

  Album.getOne = album => Album.findOne({ where: album });

  Album.getAll = () => Album.findAll();

  Album.getByTitle = title => Album.getOne({ title });

  return Album;
};

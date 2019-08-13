'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: { type: DataTypes.DATE, field: 'created_at' },
      updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
      deletedAt: { type: DataTypes.DATE, field: 'deleted_at' }
    },
    {
      tableName: 'users',
      paranoid: true,
      underscored: true
    }
  );

  User.associate = models => {
    User.belongsToMany(models.albums, {
      through: 'user_albums',
      as: 'albums',
      foreignKey: 'userId'
    });
  };

  User.createModel = user => User.create(user);

  User.getOne = user => User.findOne({ where: user });

  User.getAll = () => User.findAll();

  User.getByUsername = username => User.getOne({ username });

  User.prototype.updateModel = props => this.update(props);

  return User;
};

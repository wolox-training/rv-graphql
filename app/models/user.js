'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.associate = models => {
    User.belongsToMany(models.Album, {
      as: 'albums',
      through: 'UserAlbums',
      foreignKey: 'userId'
    });
  };

  User.createModel = user => User.create(user);

  User.getOne = user => User.findOne({ where: user });

  User.getAll = () => User.findAll();

  User.getByUsername = username => User.getOne({ username });

  User.prototype.updateModel = props => this.update(props);

  // User.getAllAll = (user, albumModel) =>
  //   User.findAll({
  //     include: [
  //       {
  //         model: albumModel,
  //         as: 'albums',
  //         required: false,
  //         attributes: ['id', 'name'],
  //         through: { attributes: [] }
  //       }
  //     ],
  //     where: { user }
  //   });

  return User;
};

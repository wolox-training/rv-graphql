'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        // field: 'first_name',
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        // field: 'last_name',
        allowNull: false
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
      }
    },
    {}
  );

  User.associate = models => {
    User.belongsToMany(models.Album, {
      as: 'albums',
      through: models.UserAlbums,
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

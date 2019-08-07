'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
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
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  User.associate = models => {
    User.belongsToMany(models.Albums, {
      through: 'UserAlbums',
      as: 'albums',
      foreignKey: 'user_id'
    });
  };

  User.createModel = user => User.create(user);

  User.getOne = user => User.findOne({ where: user });

  User.getAll = () => User.findAll();

  User.getByUsername = username => User.getOne({ username });

  User.prototype.updateModel = props => this.update(props);

  User.getAllAll = (user, albumModel) =>
    User.findAll({
      include: [
        {
          model: albumModel,
          as: 'albums',
          required: false,
          attributes: ['id', 'name'],
          through: { attributes: [] }
        }
      ],
      where: { user }
    });

  return User;
};

// const Album = require('../models/album');
const { users: User } = require('../models');
const { albums: Album } = require('../models');

const buyAlbum = async () => {
  console.log('hola');
  // const createdUser = await User.createModel(
  //   {
  //     firstName: 'holas',
  //     lastName: 'chaus',
  //     username: 'aasdffaa',
  //     email: 'gasafda@wolox.com.ar',
  //     password: 'asdfa'
  //   },
  //   {
  //     include: [
  //       {
  //         model: Album,
  //         as: 'albums'
  //       }
  //     ]
  //   }
  // );
  // const found =
  await User.findAll({
    include: [
      // Album
      {
        model: Album,
        // through: { attributes: [] },
        as: 'albums'
        //   attributes: ['id', 'title']
      }
    ]
  }).then(users => {
    users.forEach(user => {
      console.log(user.get().albums);
    });
  });
  // console.log(found);
  // console.log(found.dataValues.username);
  // console.log(found.dataValues.albums);

  // await User.addAlbum();
  // console.log(createdUser);
  // User.getAll();
  //   {
  //     firstName: 'firstName',
  //     lastName: 'lastName',
  //     email: 'email'
  //   },
  //   {
  //     include: [
  //       {
  //         model: Album,
  //         as: 'albums'
  //       }
  //     ]
  //   }
  // );
  console.log('chau');
};

module.exports = { buyAlbum };

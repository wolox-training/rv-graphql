// const Album = require('../models/album');
const { users: User } = require('../models');

const buyAlbum = async () => {
  console.log('hola');
  const createdUser = await User.createModel({
    firstName: 'holas',
    lastName: 'chaus',
    username: 'asdfa',
    email: 'gasd@wolox.com.ar',
    password: 'asdfa'
  });
  console.log(createdUser);
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

const { users: User } = require('../models');
const { albums: Album } = require('../models');
const { getAlbumById } = require('./albums');

const getAlbumsFromUser = async user => {
  console.log(user);
  const usersObject = await User.findAll({
    where: { username: user },
    include: [{ model: Album, as: 'albums' }]
  });

  return usersObject.map(userObject =>
    userObject.get().albums.map(albumObject => ({
      id: albumObject.id,
      originalAlbumId: albumObject.originalAlbumId,
      originalUserId: albumObject.originalUserId,
      title: albumObject.title
    }))
  );
};

// const buyAlbumForUser = async user => {
//   const createdUser = await User.createModel(user, {
//     include: [{ model: Album, as: 'albums', through: { attributes: [] } }]
//   });
//   console.log(createdUser);
// };

const buyAlbum = async (albumId, user) => {
  console.log('hola');
  console.log(user);
  const userObject = await User.getOne({ username: user.username });
  console.log(userObject);

  let albumInTheDB = await Album.getOne({ originalAlbumId: albumId });

  if (albumInTheDB === null) {
    const receivedAlbum = (await getAlbumById(albumId)).body;
    albumInTheDB = await Album.createModel({
      originalAlbumId: receivedAlbum.id,
      originalUserId: receivedAlbum.userId,
      title: receivedAlbum.title
    });
  }

  console.log(await userObject.addAlbum(albumInTheDB));

  console.log(albumInTheDB.dataValues);
  // return album.dataValues;
  console.log('chau');

  return {
    id: albumInTheDB.id,
    userId: albumInTheDB.originalUserId,
    title: albumInTheDB.title
  };
};

module.exports = { buyAlbum, getAlbumsFromUser };

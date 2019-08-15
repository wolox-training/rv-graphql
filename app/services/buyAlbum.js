/* eslint-disable curly */
const { users: User, albums: Album } = require('../models');
const { getAlbumById } = require('./albums');
const { badRequest } = require('../errors');

const getAlbumsFromUser = async user => {
  const userObject = await User.findOne({
    where: { username: user },
    include: [{ model: Album, as: 'albums' }]
  });

  const albumsArray = userObject.dataValues.albums;

  return albumsArray.map(albumObject => {
    const album = albumObject.get();
    return {
      id: album.id,
      originalAlbumId: album.originalAlbumId,
      originalUserId: album.originalUserId,
      title: album.title
    };
  });
};

const buyAlbumForUser = async (albumId, context) => {
  const { user } = context;
  const userObject = await User.getOne({ username: user.username });

  if (!userObject) return badRequest('The user is not logged in!');

  let albumInTheDB = await Album.getOne({ originalAlbumId: albumId });

  if (albumInTheDB === null) {
    const receivedAlbum = (await getAlbumById(albumId)).body;
    albumInTheDB = await Album.createModel({
      originalAlbumId: receivedAlbum.id,
      originalUserId: receivedAlbum.userId,
      title: receivedAlbum.title
    });
  }

  const albumsFromUser = await getAlbumsFromUser(userObject.dataValues.username);

  const userHasTheAlbum = albumsFromUser.find(album => album.originalAlbumId === albumId);

  if (userHasTheAlbum === undefined) {
    await userObject.addAlbum(albumInTheDB);
    return albumInTheDB;
  }

  return badRequest('Album already purchased');
};

module.exports = { buyAlbumForUser, getAlbumsFromUser };

/* eslint-disable curly */
const DataLoader = require('dataloader');

const { users: User } = require('../models');
const { albums: Album } = require('../models');
const { albumByIdLoader } = require('./albums');
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

const getOwnersFromAlbum = async album => {
  const albumObject = await Album.findOne({
    where: { originalAlbumId: album },
    include: [{ model: User, as: 'users' }]
  });

  const usersArray = albumObject.dataValues.users;

  return usersArray.map(userObject => userObject.get());
};

const albumsFromUserLoader = new DataLoader(keys => Promise.all(keys.map(getAlbumsFromUser)));
const ownersFromAlbumLoader = new DataLoader(keys => Promise.all(keys.map(getOwnersFromAlbum)));

const buyAlbumForUser = async (albumId, context) => {
  const { user } = context;
  const userObject = await User.getOne({ username: user.username });

  if (!userObject) return badRequest('The user is not logged in!');

  let albumInTheDB = await Album.getOne({ originalAlbumId: albumId });

  if (albumInTheDB === null) {
    const receivedAlbum = (await albumByIdLoader.load(albumId)).body;
    albumInTheDB = await Album.createModel({
      originalAlbumId: receivedAlbum.id,
      originalUserId: receivedAlbum.userId,
      title: receivedAlbum.title
    });
  }

  const albumsFromUser = await albumsFromUserLoader.load(userObject.dataValues.username);

  const userHasTheAlbum = albumsFromUser.find(element => element.originalAlbumId === albumId);

  if (userHasTheAlbum === undefined) {
    await userObject.addAlbum(albumInTheDB);
    return albumInTheDB;
  }

  return badRequest('Album already purchased');
};

module.exports = {
  buyAlbumForUser,
  albumsFromUserLoader,
  ownersFromAlbumLoader
};

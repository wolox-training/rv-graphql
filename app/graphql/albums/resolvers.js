const { getAllAlbums, getAlbumById, getPhotosFromAlbum } = require('../../services/albums');

const albumQueryResolver = async (_, params) => {
  const album = (await getAlbumById(params.id)).body;
  const photosFromAlbum = (await getPhotosFromAlbum(params.id)).body;
  album.photos = photosFromAlbum;
  return album;
};

const albumsQueryResolver = async (_, params) => {
  let { page } = params;
  let { limit } = params;

  const albums = (await getAllAlbums()).body;

  // eslint-disable-next-line curly
  if (!page || !limit) return albums;

  if (isNaN(page) || isNaN(limit) || page < 0 || limit <= 0) {
    page = 0;
    limit = 0;
    return albums.slice(limit * page, limit * (parseInt(page) + 1));
  }
  return albums.slice(limit * page, limit * (parseInt(page) + 1));
};

module.exports = {
  albumFieldResolvers: {
    userId: parent => {
      console.log('accessing album userId');
      return parent.userId;
    },
    title: parent => parent.title,
    photos: parent => parent.photos,
    id: parent => parent.id
  },
  photoFieldResolvers: {
    albumId: parent => {
      console.log('accessing photo albumId');
      return parent.albumId;
    },
    id: parent => parent.id,
    url: parent => parent.url,
    thumbnailUrl: parent => parent.thumbnailUrl
  },
  albumQueryResolver,
  albumsQueryResolver
};

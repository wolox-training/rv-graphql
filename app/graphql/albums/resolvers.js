/* eslint-disable curly */
const { getAllAlbums, getAlbumById, getPhotosFromAlbum } = require('../../services/albums');
const { sortAlbums } = require('../../helpers/sorting');

const albumQueryResolver = async (_, params) => (await getAlbumById(params.id)).body;

const albumsQueryResolver = async (_, params) => {
  let { page, limit } = params;
  const { sortingKey, sortingOrder } = params;

  const albums = (await getAllAlbums()).body;

  if (sortingKey && sortingOrder) sortAlbums(albums, sortingKey, sortingOrder);

  if (page === undefined || limit === undefined) return albums;

  if (isNaN(page) || isNaN(limit) || page < 0 || limit <= 0) {
    page = 0;
    limit = 0;
    return albums.slice(limit * page, limit * (parseInt(page) + 1));
  }
  return albums.slice(limit * page, limit * (parseInt(page) + 1));
};

module.exports = {
  albumFieldResolvers: {
    userId: parent => parent.userId,
    title: parent => parent.title,
    id: parent => parent.id,
    photos: async parent => (await getPhotosFromAlbum(parent.id)).body
  },
  photoFieldResolvers: {
    albumId: parent => parent.albumId,
    id: parent => parent.id,
    url: parent => parent.url,
    thumbnailUrl: parent => parent.thumbnailUrl
  },
  albumQueryResolver,
  albumsQueryResolver
};

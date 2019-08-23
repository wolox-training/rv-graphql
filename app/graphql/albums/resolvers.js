/* eslint-disable no-return-await */
/* eslint-disable curly */
const { allAlbumsLoader, albumByIdLoader, photosFromAlbumLoader } = require('../../services/albums');
const { ownersFromAlbumLoader } = require('../../services/buyAlbum');
const { sortArray } = require('../../helpers/sorting');
const { internalServerError } = require('../../errors');
const logger = require('../../logger');

const filterAlbums = (array, query) =>
  query ? array.filter(element => element.title.toLowerCase().indexOf(query.toLowerCase()) !== -1) : array;

const sliceAlbums = (paramPage, paramLimit, albums) => {
  let page = paramPage;
  let limit = paramLimit;
  if (page === undefined || limit === undefined) return albums;

  if (isNaN(page) || isNaN(limit) || page < 0 || limit <= 0) {
    page = 0;
    limit = 0;
    return albums.slice(limit * page, limit * (parseInt(page) + 1));
  }
  return albums.slice(limit * page, limit * (parseInt(page) + 1));
};

const albumQueryResolver = async params => {
  try {
    const album = (await albumByIdLoader.load(params.id)).body;
    return { originalAlbumId: album.id, originalUserId: album.userId, title: album.title };
  } catch (error) {
    logger(error);
    return internalServerError(error);
  }
};

const albumsQueryResolver = async params => {
  try {
    const { page, limit, sortingKey, sortingOrder, filteringString } = params;

    const originalAlbums = (await allAlbumsLoader.load(0)).body;

    let albums = originalAlbums.map(album => ({
      originalAlbumId: album.id,
      originalUserId: album.userId,
      title: album.title
    }));

    albums = filterAlbums(albums, filteringString);
    if (
      (sortingKey === 'title' || sortingKey === 'originalAlbumId' || sortingKey === 'originalUserId') &&
      sortingOrder
    )
      sortArray(albums, sortingKey, sortingOrder);

    albums = sliceAlbums(page, limit, albums);
    return albums;
  } catch (error) {
    logger(error);
    return internalServerError(error);
  }
};

module.exports = {
  albumFieldResolvers: {
    photos: async parent => (await photosFromAlbumLoader.load(parent.originalAlbumId)).body,
    owners: async parent => await ownersFromAlbumLoader.load(parent.originalAlbumId)
  },
  albumQueryResolver,
  albumsQueryResolver
};

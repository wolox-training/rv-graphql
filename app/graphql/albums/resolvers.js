/* eslint-disable no-return-await */
/* eslint-disable curly */
const { getAllAlbums, getAlbumById, getPhotosFromAlbum } = require('../../services/albums');
const { getOwnersFromAlbum } = require('../../services/buyAlbum');
const { sortArray } = require('../../helpers/sorting');

const filterAlbums = (array, query) =>
  array.filter(element => element.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);

const albumQueryResolver = async params => (await getAlbumById(params.id)).body;

const albumsQueryResolver = async params => {
  let { page, limit } = params;
  const { sortingKey, sortingOrder, filteringString } = params;

  let albums = (await getAllAlbums()).body;

  if (filteringString) albums = filterAlbums(albums, filteringString);
  if (sortingKey === 'title' && sortingOrder) sortArray(albums, sortingKey, sortingOrder);

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
    photos: async parent => (await getPhotosFromAlbum(parent.id)).body,
    owners: async parent => await getOwnersFromAlbum(parent.originalAlbumId)
  },
  albumQueryResolver,
  albumsQueryResolver
};

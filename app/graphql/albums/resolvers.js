/* eslint-disable no-return-await */
/* eslint-disable curly */
const { allAlbumsLoader, albumByIdLoader, photosFromAlbumLoader } = require('../../services/albums');
const { getOwnersFromAlbum } = require('../../services/buyAlbum');
const { sortArray } = require('../../helpers/sorting');

const filterAlbums = (array, query) =>
  array.filter(element => element.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);

const albumQueryResolver = async params => {
  const album = (await albumByIdLoader.load(params.id)).body;
  return { originalAlbumId: album.id, originalUserId: album.userId, title: album.title };
};

const albumsQueryResolver = async params => {
  let { page, limit } = params;
  const { sortingKey, sortingOrder, filteringString } = params;

  const originalAlbums = (await allAlbumsLoader.load()).body;

  let albums = originalAlbums.map(album => ({
    originalAlbumId: album.id,
    originalUserId: album.userId,
    title: album.title
  }));

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
    photos: async parent => (await photosFromAlbumLoader.load(parent.originalAlbumId)).body,
    owners: async parent => await getOwnersFromAlbum(parent.originalAlbumId)
  },
  albumQueryResolver,
  albumsQueryResolver
};

const DataLoader = require('dataloader');

const { ALBUMS_API_URL: url } = require('../../config/environment');
const { request } = require('../helpers/request');

const getAllAlbums = () =>
  request({
    url: `${url}/albums`,
    method: 'get',
    json: true
  });

const getAlbumById = id =>
  request({
    url: `${url}/albums/${id}`,
    method: 'get',
    json: true
  });

const getPhotosFromAlbum = id =>
  request({
    url: `${url}/photos?albumId=${id}`,
    method: 'get',
    json: true
  });

const getPhotoFromAlbumById = (idAlbum, idPhoto) =>
  request({
    url: `${url}/photos?albumId=${idAlbum}&id=${idPhoto}`,
    method: 'get',
    json: true
  });

const allAlbumsLoader = new DataLoader(keys => Promise.all(keys.map(getAllAlbums)));
const albumByIdLoader = new DataLoader(keys => Promise.all(keys.map(getAlbumById)));
const photosFromAlbumLoader = new DataLoader(keys => Promise.all(keys.map(getPhotosFromAlbum)));
const photoFromAlbumByIdLoader = new DataLoader(keys => Promise.all(keys.map(getPhotoFromAlbumById)));

module.exports = {
  allAlbumsLoader,
  albumByIdLoader,
  photosFromAlbumLoader,
  photoFromAlbumByIdLoader
};

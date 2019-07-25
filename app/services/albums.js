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

const getPhotoFromAlbumByIds = (idAlbum, idPhoto) =>
  request({
    url: `${url}/photos?albumId=${idAlbum}&id=${idPhoto}`,
    method: 'get',
    json: true
  });

module.exports = {
  getAllAlbums,
  getAlbumById,
  getPhotosFromAlbum,
  getPhotoFromAlbumByIds
};

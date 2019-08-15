const DataLoader = require('dataloader');
const redis = require('redis');

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

const client = redis.createClient();

const redisLoader = new DataLoader(
  keys =>
    new Promise((resolve, reject) => {
      client.mget(keys, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(
          results.map((result, index) => {
            if(result !== null) {
              return result
            } else {
              return new Error(`No key: ${keys[index]}`)
            }}))}})
      });
    })
);

console.log(client);

const allAlbumsLoader = new DataLoader(keys => Promise.resolve(client.mget(keys.map(getAllAlbums))));
const albumByIdLoader = new DataLoader(keys => Promise.resolve(keys.map(getAlbumById)));
const photosFromAlbumLoader = new DataLoader(keys => Promise.resolve(keys.map(getPhotosFromAlbum)));
const photoFromAlbumByIdLoader = new DataLoader(keys => Promise.resolve(keys.map(getPhotoFromAlbumById)));

module.exports = {
  allAlbumsLoader,
  albumByIdLoader,
  photosFromAlbumLoader,
  photoFromAlbumByIdLoader
};

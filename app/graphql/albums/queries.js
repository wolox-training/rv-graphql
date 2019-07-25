const { gql } = require('apollo-server');
const { request } = require('../../helpers/request');
const { ALBUMS_API_URL: url } = require('../../../config/environment');

const getAllAlbums = () =>
  request({
    url: `${url}/albums`,
    method: 'get',
    json: true
  });

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

// const getAlbumById = id =>
//   request({
//     url: `${url}/albums/${id}`,
//     method: 'get',
//     json: true
//   });

// const getPhotosFromAlbum = id =>
//   request({
//     url: `${url}/photos?albumId=${id}`,
//     method: 'get',
//     json: true
//   });

// const getPhotoFromAlbumByIds = (idAlbum, idPhoto) =>
//   request({
//     url: `${url}/photos?albumId=${idAlbum}&id=${idPhoto}`,
//     method: 'get',
//     json: true
//   });

// module.exports = {
//   queries: {
//     // album: (_, params) => getAllAlbums(),
//     // albums: (_, params) => getAllAlbums(params)
//     album: (_, params) => 'hola'
//   },
//   schema: gql`
//     extend type Query {
//       album(id: ID, userID: , titple: String): Album!
//       albums: [Album]
//     }
//   `
// };

// const { user: User } = require('../../models');

const albums = [
  {
    id: 2,
    userId: 55,
    title: 'Fullstack tutorial for GraphQL'
  }
];

module.exports = {
  queries: {
    books: () => {
      console.log(getAllAlbums());
      return books;
    },
    album: () => albums
  },
  schema: gql`
    extend type Query {
      album(id: ID, userId: Int, title: String): Album!
      books: [Book]
    }
  `
};

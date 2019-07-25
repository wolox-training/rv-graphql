const { gql } = require('apollo-server');
const { getAllAlbums } = require('../../services/albums');

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

const albums = [
  {
    id: 2,
    userId: 55,
    title: 'Fullstack tutorial for GraphQL'
  }
];

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

module.exports = {
  queries: {
    books: async () => {
      console.log('holas');
      const albumsObject = await getAllAlbums();
      console.log(albumsObject.body);
      return books;
    },
    album: async () => {
      console.log('holas');
      const albumsObject = await getAllAlbums();
      console.log(albumsObject.body);
      console.log(albums);
      // return albums;
      return albums;
    },
    albums: async () => {
      const albumsObject = await getAllAlbums();
      return albumsObject.body;
    }
  },
  schema: gql`
    extend type Query {
      album(id: ID, userId: Int, title: String): Album!
      albums: [Album]
      books: [Book]
    }
  `
};

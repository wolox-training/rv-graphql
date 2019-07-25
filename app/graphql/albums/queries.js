const { gql } = require('apollo-server');
const { getAllAlbums, getAlbumById, getPhotosFromAlbum } = require('../../services/albums');

module.exports = {
  queries: {
    album: async (_, params) => {
      const album = (await getAlbumById(params.id)).body;
      const photosFromAlbum = (await getPhotosFromAlbum(params.id)).body;
      album.photos = photosFromAlbum;
      return album;
    },
    albums: async () => {
      const albums = (await getAllAlbums()).body;
      return albums;
    }
  },
  schema: gql`
    extend type Query {
      album(id: ID, userId: Int, title: String): Album!
      albums: [Album]
    }
  `
};

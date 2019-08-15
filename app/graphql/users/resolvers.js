/* eslint-disable no-return-await */
const { albumsFromUserLoader } = require('../../services/buyAlbum');

module.exports = {
  userFieldResolvers: {
    name: parent => `${parent.firstName} ${parent.lastName}`,
    albums: async parent => await albumsFromUserLoader.load(parent.username)
  }
};

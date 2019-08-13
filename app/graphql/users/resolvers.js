/* eslint-disable no-return-await */
const { getAlbumsFromUser } = require('../../services/buyAlbum');

module.exports = {
  userFieldResolvers: {
    name: parent => `${parent.firstName} ${parent.lastName}`,
    albums: async parent => await getAlbumsFromUser(parent.username)
  }
};

/* eslint-disable no-return-await */
const { getAlbumsFromUser } = require('../../services/buyAlbum');

module.exports = {
  userFieldResolvers: {
    name: parent => `${parent.firstName} ${parent.lastName}`,
    albums: async parent => {
      console.log(
        'hoasdfajsdfla;sjdflk',
        Object.keys(parent),
        parent,
        parent.dataValues,
        parent.dataValues.username,
        parent.dataValues.email
      );
      console.log(await getAlbumsFromUser(parent.dataValues.username));
    }
  }
};

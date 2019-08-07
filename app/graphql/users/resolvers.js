// const { album: Album } = require('../models');

module.exports = {
  userFieldResolvers: {
    name: parent => `${parent.firstName} ${parent.lastName}`
    // albumasdf: async parent => parent
  }
};

module.exports = {
  userFieldResolvers: {
    name: parent => `${parent.firstName} ${parent.lastName}`
  }
};

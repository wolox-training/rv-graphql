const { factory } = require('factory-girl'),
  faker = require('faker'),
  models = require('../../app/models'),
  // { encryptPassword } = require('../../app/helpers/encryption'),
  { user: User } = models;

factory.define('user', User, {
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  email: () => faker.internet.email(),
  username: () => faker.internet.email(),
  password: () => faker.internet.password()
  // email: () => `${faker.name.lastName()}@wolox.com.ar`,
  // password: encryptPassword(factory.chance('word', { length: 8 })())
});

module.exports = {
  create: params => factory.create('user', params),
  createMany: () => factory.createMany('user', 5),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params),
  cleanUp: () => factory.cleanUp()
};

const { factory } = require('factory-girl'),
  faker = require('faker'),
  models = require('../../app/models'),
  { users: User } = models;

factory.define('User', User, {
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  email: () => `${faker.name.lastName()}@wolox.com.ar`,
  username: () => faker.internet.email(),
  password: factory.chance('word', { length: 8 })()
});

module.exports = {
  create: params => factory.create('User', params),
  createMany: () => factory.createMany('User', 5),
  build: params => factory.build('User', params),
  attributes: params => factory.attrs('User', params),
  cleanUp: () => factory.cleanUp()
};

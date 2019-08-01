const { mutate } = require('../server.spec'),
  { createUser } = require('./graphql'),
  userFactory = require('../factories/user'),
  { checkPassword } = require('../../app/helpers/encryption');

describe('users', () => {
  beforeEach(() => userFactory.cleanUp());
  afterEach(() => userFactory.cleanUp());

  describe('mutations', () => {
    beforeEach(() => userFactory.cleanUp());
    afterEach(() => userFactory.cleanUp());

    it('should create an user successfuly', () => {
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(res => {
          const { firstName, lastName, email, password, username, id } = res.data.createUser;
          expect(firstName).toEqual(user.firstName);
          expect(lastName).toEqual(user.lastName);
          expect(email).toEqual(user.email);
          expect(checkPassword(user.password, password)).toEqual(true);
          expect(username).toEqual(user.username);
          expect(id).toBeDefined();
        })
      );
    });

    // it('should return password too short', () => {
    //   userFactory.attributes().then(user =>
    //     mutate(createUser(user)).then(res => {
    //       const { firstName, lastName, email, password, username, id } = res.data.createUser;
    //       expect(firstName).toEqual(user.firstName);
    //       expect(lastName).toEqual(user.lastName);
    //       expect(email).toEqual(user.email);
    //       expect(password).toEqual(user.password);
    //       expect(username).toEqual(user.username);
    //       expect(id).toBeDefined();
    //     })
    //   );
    // });

    // it('should return password not alphanumeric', () => {
    //   userFactory.attributes().then(user =>
    //     mutate(createUser(user)).then(res => {
    //       const { firstName, lastName, email, password, username, id } = res.data.createUser;
    //       expect(firstName).toEqual(user.firstName);
    //       expect(lastName).toEqual(user.lastName);
    //       expect(email).toEqual(user.email);
    //       expect(password).toEqual(user.password);
    //       expect(username).toEqual(user.username);
    //       expect(id).toBeDefined();
    //     })
    //   );
    // });

    // it('should return not a wolox email', () => {
    //   userFactory.attributes().then(user =>
    //     mutate(createUser(user)).then(res => {
    //       const { firstName, lastName, email, password, username, id } = res.data.createUser;
    //       expect(firstName).toEqual(user.firstName);
    //       expect(lastName).toEqual(user.lastName);
    //       expect(email).toEqual(user.email);
    //       expect(password).toEqual(user.password);
    //       expect(username).toEqual(user.username);
    //       expect(id).toBeDefined();
    //     })
    //   );
    // });
  });
});

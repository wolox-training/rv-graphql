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

    it('should create an user successfuly using the name field', () => {
      userFactory.attributes({ firstName: '', lastName: '', name: 'Carl Johnsson' }).then(user =>
        mutate(createUser(user)).then(res => {
          user.firstName = 'Carl';
          user.lastName = 'Johnsson';
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

    it('should return password too short', () => {
      userFactory.attributes({ email: 'casrta@wolox.com.ar', password: 'asadfas' }).then(user =>
        mutate(createUser(user)).then(res => {
          const errors = res.errors[0];
          expect(errors.message).toEqual('Password too short!');
          expect(errors.path).toEqual(['createUser']);
          expect(errors.extensions).toEqual({ code: 500 });
        })
      );
    });

    it('should return password not alphanumeric', () => {
      userFactory.attributes({ email: 'casrta@wolox.com.ar', password: 'asadfa!saasdf' }).then(user =>
        mutate(createUser(user)).then(res => {
          const errors = res.errors[0];
          expect(errors.message).toEqual('Password is not alphanumeric!');
          expect(errors.path).toEqual(['createUser']);
          expect(errors.extensions).toEqual({ code: 500 });
        })
      );
    });

    it('should return not a wolox email', () => {
      userFactory.attributes({ email: 'casrta@wo1lox.com.ar', password: 'asadfaasdfs' }).then(user =>
        mutate(createUser(user)).then(res => {
          const errors = res.errors[0];
          expect(errors.message).toEqual('Email not valid!');
          expect(errors.path).toEqual(['createUser']);
          expect(errors.extensions).toEqual({ code: 500 });
        })
      );
    });
  });
});

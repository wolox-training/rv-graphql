const { mutate } = require('../server.spec'),
  { createUser, login } = require('./graphql'),
  userFactory = require('../factories/user'),
  { checkPassword } = require('../../app/helpers/encryption');
const { encryptPassword } = require('../../app/helpers/encryption');
const { JWT_EXPIRATION_TIME } = require('../../config/environment');
const { verifyToken } = require('../../app/helpers/token');
// const { users: User } = require('../../app/models');

describe('users', () => {
  beforeEach(() => userFactory.cleanUp());
  afterEach(() => userFactory.cleanUp());

  describe('mutations', () => {
    beforeEach(() => userFactory.cleanUp());
    afterEach(() => userFactory.cleanUp());

    describe('create user', () => {
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

    describe('login', () => {
      beforeEach(() => userFactory.cleanUp());
      afterEach(() => userFactory.cleanUp());

      it('should return no input username', async () => {
        await userFactory.create({ email: 'carlos@wolox.com.ar', password: 'mysuperpassword' }).then(user =>
          mutate(login({ password: user.password })).then(res => {
            const errors = res.errors[0];
            expect(errors.message).toEqual('No input username!');
            expect(errors.path).toEqual(['login']);
            expect(errors.extensions).toEqual({ code: 400 });
          })
        );
      });

      it('should return no input password', async () => {
        await userFactory.create({ email: 'carlos@wolox.com.ar', password: 'mysuperpassword' }).then(user =>
          mutate(login({ username: user.username })).then(res => {
            const errors = res.errors[0];
            expect(errors.message).toEqual('No input password!');
            expect(errors.path).toEqual(['login']);
            expect(errors.extensions).toEqual({ code: 400 });
          })
        );
      });

      it('should return username not registered', async () => {
        await userFactory.create({ email: 'carlos@wolox.com.ar', password: 'mysuperpassword' }).then(user =>
          mutate(login({ username: 'user1', password: user.password })).then(res => {
            const errors = res.errors[0];
            expect(errors.message).toEqual('The username: user1 is not registered.');
            expect(errors.path).toEqual(['login']);
            expect(errors.extensions).toEqual({ code: 401 });
          })
        );
      });

      it('should return the password was wrong', async () => {
        await userFactory
          .create({ username: 'carlos', password: encryptPassword('mysuperpassword') })
          .then(user =>
            mutate(login({ username: user.username, password: user.password })).then(res => {
              const errors = res.errors[0];
              expect(errors.message).toEqual(
                `The password for the user with the username: ${user.username} was wrong.`
              );
              expect(errors.path).toEqual(['login']);
              expect(errors.extensions).toEqual({ code: 401 });
            })
          );
      });

      it('should return the token', async () => {
        await userFactory
          .create({ username: 'carlos', password: encryptPassword('mysuperpassword') })
          .then(user =>
            mutate(login({ username: 'carlos', password: 'mysuperpassword' })).then(res => {
              const data = res.data.login;
              expect(verifyToken(data.accessToken).username).toEqual(user.username);
              expect(data.refreshToken).toEqual('example_refresh_token');
              expect(data.expiresIn).toEqual(parseInt(JWT_EXPIRATION_TIME));
            })
          );
      });
    });
  });
});

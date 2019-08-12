const userFactory = require('../factories/user'),
  { mutations } = require('../../app/graphql/users/mutations');

describe('users', () => {
  beforeEach(() => userFactory.cleanUp());
  afterEach(() => userFactory.cleanUp());

  describe('resolvers', () => {
    beforeEach(() => userFactory.cleanUp());
    afterEach(() => userFactory.cleanUp());

    describe('createUser', () => {
      beforeEach(() => userFactory.cleanUp());
      afterEach(() => userFactory.cleanUp());

      it('should create an user successfuly', async () => {
        const user = await userFactory.build();
        mutations.createUser({}, { user: user.dataValues }).then(res => {
          expect(res.dataValues).toHaveProperty('id');
          expect(res.dataValues).toHaveProperty('firstName');
          expect(res.dataValues).toHaveProperty('lastName');
          expect(res.dataValues).toHaveProperty('email');
          expect(res.dataValues).toHaveProperty('username');
          expect(res.dataValues).toHaveProperty('password');
          expect(res.dataValues).toHaveProperty('updated_at');
          expect(res.dataValues).toHaveProperty('created_at');
        });
      });

      it('should fail to create an user with malformed parameters', () => {
        mutations.createUser({}, { user: { a: 'b' } }).catch(err => {
          expect(typeof err.errors).toBe('object');
          expect(err.errors).toHaveLength();
        });
      });
    });
  });
});

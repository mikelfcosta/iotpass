import * as supertest from 'supertest';
import App from '../../../App';
import { OmniRouter } from '../../../Router';
import { omniUsers } from '../models/Users';

const agent = supertest.agent(App);
const core = OmniRouter.coreApi;
const path = `${core}/users/new`;

describe('[Core] Create Users Tests', () => {
  test('creates a new user with correct info', (done) => {
    const userToCreate = { username: 'CREATED.USER', password: 'created1234' };
    agent
      .post(path)
      .send(userToCreate)
      .expect(200)
      .end(async (err, res) => {
        if (err) return done(err);
        try {
          const user = await omniUsers.findById(userToCreate.username);
          expect(user).toContain({ _id: userToCreate.username });
          return done();
        } catch (err) {
          return done(err);
        }
      });
  });
  test('does not create a new user with incorrect info');
  test('does not create a new user on unauthorized access');
  test('does not create a new user on unauthenticated access');
});
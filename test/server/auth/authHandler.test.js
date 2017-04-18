require('dotenv').config();
const request = require('supertest');
const app = require('../../../server/server.js').app;
const dbConfig = require('../../../db/config.js');

let db = null;
db = dbConfig.db;

jest.mock('../../../server/calling/config.js');
const Call = require('../../../server/calling/config.js');

const resetDb = () => (
  db.none('TRUNCATE users RESTART IDENTITY CASCADE')
);

const testUser = {
  email: 'newUser@mail.com',
  firstName: 'New user',
  lastName: 'To be deleted',
  password: 'password',
  phone: '6505421376'
};

beforeAll(() => {
  resetDb();
});

afterAll(() => {
  resetDb();
});

describe('authHandler tests', () => {
  it('should handle POST /signup route', () => {
    return request(app)
      .post('/api/auth/signup')
      .send(testUser)
      .then((res) => {
        expect(Call.sendVerification).toBeCalledWith(testUser.phone);
        expect(res.statusCode).toEqual(200);
        expect(res.body.user).toBeDefined();
        expect(res.body.token).toBeDefined();
      });
  });

  it('should send an error message if email exists in the DB', () => {
    return request(app).post('/api/auth/signup')
      .send({
        email: 'newUser@mail.com',
        firstName: 'New user',
        lastName: 'To be deleted',
        password: 'password',
        phone: '6505421376'
      })
      .expect(400)
      .then((res) => {
        expect(res.error.text).toBeDefined();
      });
  });

  it('should handle POST /login route', () => {
    return request(app).post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      })
      .expect(200)
      .then((res) => {
        expect(res.body.user).toBeDefined();
        expect(res.body.token).toBeDefined();
      });
  });

  it('should send an error message if login fails.', () => {
    return request(app).post('/api/auth/login')
      .send({
        email: 'newUser@mail.com',
        password: 'wrongpassword'
      })
      .expect(401)
      .then((res) => {
        expect(res.error.text).toBeDefined();
      });
  });
});

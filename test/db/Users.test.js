require('dotenv').config();

if (process.env.IS_ON === 'development') {
  process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
}
const User = require('../../server/models/users.js');
const db = require('../../db/config.js').db;

const testUser = {
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Smith',
  password: 'password',
  phone: '1234567890',
  phone_verified: false
};

afterAll(() => (
  db.one('DELETE FROM users WHERE first_name = $1', [testUser.first_name])
));

describe('Database exists', () => {
  it('should connect to the database', () => {
    expect(db).toBeDefined();
  });
});

describe('Users table', () => {
  let userId = null;

  it('should have a users table', (done) => {
    db.any('SELECT * FROM users')
      .then(() => {
        done();
      })
      .catch((error) => {
        throw error;
      });
  });

  it('should add a new user into the table', () => {
    return User.new(testUser)
      .then((user) => {
        expect(user.user_id).toBeDefined();
        expect(user.email).toEqual(testUser.email);
        expect(user.first_name).toEqual(testUser.first_name);
        expect(user.last_name).toEqual(testUser.last_name);
        expect(user.phone).toEqual(testUser.phone);
        expect(user.phone_verified).toEqual(testUser.phone_verified);
      });
  });

  it('should find newly added users', () => {
    return User.findByEmail(testUser.email)
      .then((user) => {
        expect(user.first_name).toEqual(testUser.first_name);
        expect(user.last_name).toEqual(testUser.last_name);
      });
  });

  it('should have a created timestamp that is defined and a modified timestamp that is undefined', () => {
    return User.findByPhone(testUser.phone)
      .then((user) => {
        expect(user.created).toBeDefined();
        expect(user.modified).toBe(null);
        userId = user.user_id;
      });
  });

  it('should change email when requested and update the modified timestamp', () => {
    return User.update(userId, 'email', 'test2@example.com')
      .then((user) => {
        expect(user[0].email).toBe('test2@example.com');
        expect(user[0].modified).toBeDefined();
      });
  });

  it('should delete a user', () => {
    return User.delete(userId)
      .then(() => (
        User.findByPhone(testUser.phone)
      ))
      .then((user) => {
        expect(user).toBe(null);
      });
  });
});

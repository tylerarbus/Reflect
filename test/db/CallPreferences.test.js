require('dotenv').config();

if (process.env.IS_ON === 'development') {
  process.env.DATABASE_URL = 'postgres://@localhost:5432/reflectivetest';
}
const db = require('../../db/config.js').db;
const User = require('../../server/models/users.js');
const CallPreferences = require('../../server/models/call-preferences.js');

const testUser = {
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Smith',
  password: 'password',
  phone: '1234567890',
  phone_verified: false
};

const testUser2 = {
  email: 'test2@example.com',
  first_name: 'John2',
  last_name: 'Smith2',
  password: 'password',
  phone: '1234567890',
  phone_verified: false
};

beforeAll(() => (
  User.new(testUser)
    .then((user) => {
      testUser.user_id = user.user_id;
      return CallPreferences.new(user.user_id, '19:25');
    })
    .then(() => (
      User.new(testUser2)
    ))
    .then((user2) => {
      testUser2.user_id = user2.user_id;
      return CallPreferences.new(user2.user_id, '15:05');
    })
));

afterAll(() => (
  db.none('TRUNCATE users RESTART IDENTITY CASCADE')
));

describe('Call Preferences Tests: ', () => {
  it('should get all users with call preferences for the hour', () => {
    return CallPreferences.getAllByHour('19')
      .then((callPreference) => {
        expect(callPreference[0].user_id).toEqual(testUser.user_id);
        expect(callPreference.length).toEqual(1);
      });
  });
});

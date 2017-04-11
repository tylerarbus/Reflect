const db = require('../../db/config.js');
const Users = require('../../server/models/users.js');

afterAll(() => {
  return db.one("DELETE FROM users WHERE first_name = 'John'");
})

describe('Database exists', () => {

  it('should connect to the database', () => {
    expect(db).toBeDefined();
  })

})

describe('Users table', () => {

  it('should have a users table', (done) => {
    db.any('SELECT * FROM users')
      .then(result => {
        done();
      })
      .catch(error => {
        throw error;
      })
  })
  
  it('should add a new user into the table', () => {
    const newUser = {
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Smith',
      password: 'password',
      phone: '123-456-7890',
      salt: '12345'
    }
    return Users.addUser(newUser)
      .then(userId => {
        expect(userId).toBeDefined();
      });
  })

  it('should find newly added users', () => {
    const email = 'test@example.com';
    return Users.find(email)
      .then(user => {
        expect(user.first_name).toEqual('John');
        expect(user.last_name).toEqual('Smith');
      })
  })

})
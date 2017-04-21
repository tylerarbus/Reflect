process.env.IS_ON = 'development';
process.env.DATABASE_URL = 'postgres://@localhost:5432/reflective';

const { db } = require('./config.js');
const User = require('../server/models/users.js');
const CallPreferences = require('../server/models/call-preferences.js');
const Entries = require('../server/models/entries.js');


const newUser = {
  email: 'adrianmole@email.com',
  first_name: 'Adrian',
  last_name: 'Mole',
  password: 'password',
  phone: '6505421376',
  phone_verified: true
};

const entries = [
  {
    call_id: 'CA2f4221c266d6bc54f2d8b28a5594e6e6',
    created: '2017-02-01 22:38:38.130256-07'
  },
  {
    call_id: 'CA5d76c33534d08b545618b024b9e97d18',
    created: '2017-02-02 22:38:38.130256-07'
  },
  {
    call_id: 'CA1a5ce75df5bde3f74170d83c7f0e46cf',
    created: '2017-03-03 22:38:38.130256-07'
  },
  {
    call_id: 'CA3e40fc942b94452bb3b8e718967c8dc3',
    created: '2017-03-04 22:38:38.130256-07'
  },
  {
    call_id: 'CA843c3520841451544551652ddb96ee78',
    created: '2017-04-05 22:38:38.130256-07'
  },
  {
    call_id: 'CAd7ca52765f277874becc5b28d0e43e74',
    created: '2017-04-06 22:38:38.130256-07'
  },
  {
    call_id: 'CA84ecbfd0c763a6ba64c8c4fd5df4b394',
    created: '2017-04-06 22:38:38.130256-07'
  },
  {
    call_id: 'CA61fd222927fee1f538032ba91e7ff74b',
    created: '2017-04-06 22:38:38.130256-07'
  },
  {
    call_id: 'CA3a126e2ec4f9a90e6fcb7ef8216aeb41',
    created: '2017-04-06 22:38:38.130256-07'
  }
];

const users = [
  {
    email: 'random1@email.com',
    first_name: 'Random1',
    last_name: 'Lastname1',
    password: 'password',
    phone: '6505421376',
    phone_verified: false
  },
  {
    email: 'random2@email.com',
    first_name: 'Random2',
    last_name: 'Lastname2',
    password: 'password',
    phone: '6505421376',
    phone_verified: false
  },
  {
    email: 'random3@email.com',
    first_name: 'Random3',
    last_name: 'Lastname3',
    password: 'password',
    phone: '6505421376',
    phone_verified: false
  },
  {
    email: 'random4@email.com',
    first_name: 'Random4',
    last_name: 'Lastname4',
    password: 'password',
    phone: '6505421376',
    phone_verified: false
  }
];

User.new(newUser)
  .then((user) => {
    newUser.user_id = user.user_id;
    CallPreferences.new(newUser.user_id, '19:45');
  })
  .then(() => {
    entries.forEach((entry) => {
      const newEntry = entry;
      newEntry.user_id = newUser.user_id;
      Entries.new(newEntry)
        .then(() => {
          console.log('entry added!');
        })
        .catch((error) => {
          console.error('error adding mock entries', error);
        });
    });
  })
  .catch((error) => {
    console.error('failed to add user', error);
  });

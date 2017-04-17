process.env.IS_ON = 'development';
process.env.DATABASE_URL = 'postgres://@localhost:5432/reflective';

const { db } = require('./config.js');
const Users = require('../server/models/users.js');
const Audio = require('../server/models/audio.js');
const Entries = require('../server/models/entries.js');
const EntryText = require('../server/models/entry-text.js');

const newDummySentiment = timestamp => {
  return db.query("INSERT INTO sentiment\
    (value, created)\
    VALUES ($1, $2)",
    [Math.random(), timestamp]);
}

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push( new Date (currentDate) )
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

const dateRange = getDates(new Date('2017-01-01'), new Date('2017-04-16'));

dateRange.forEach(date => {
  newDummySentiment(date)
    .then(result => {
      console.log('sentiment added');
    })
    .catch(error => {
      console.error('sentiment failed to add', error);
    })
})

const newUser = {
  email: 'test@example.com',
  first_name: 'John',
  last_name: 'Smith',
  password: 'password',
  phone: '123-456-7890',
  phone_verified: false
}

const entries = [
  {
    entry_id: 1,
    entry_text: 'Test entry 1',
    user_id: 1,
    call_id: 1
  },
  {
    entry_id: 2,
    entry_text: 'Test entry 2',
    user_id: 1,
    call_id: 2
  },
  {
    entry_id: 3,
    entry_text: 'Test entry 3',
    user_id: 1,
    call_id: 3
  } 
]

Users.new(newUser)
  .then(result => {
    entries.forEach(entry => {
      Entries.new(entry)
        .then(result => {
          return EntryText.new(result.entry_id, entry.entry_text)
        })
        .then(() => {
          console.log('entry added!');
        })
        .catch(error => {
          console.error('error adding mock entries', error);
        })
    })
  })
  .catch(error => {
    console.error('failed to add user', error);
  })



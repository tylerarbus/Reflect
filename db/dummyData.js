process.env.IS_ON = 'development';
process.env.DATABASE_URL = 'postgres://@localhost:5432/reflective';

const { db } = require('./config.js');

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
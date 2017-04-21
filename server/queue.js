require('dotenv').config();
const kue = require('kue');

const q = kue.createQueue({
  redis: process.env.REDIS_URL
});

q.on('job enqueue', (id, type) => {
  console.log('Job enqueued: ', id, type);
});

q.on('job start', (id, result) => {
  console.log('Job start: ', id, result);
});

q.on('job complete', (id, result) => {
  console.log('Job complete: ', id, result);
});

q.on('job remove', (id) => {
  console.log('Job removed: ', id);
});

q.on('job failed', (error) => {
  console.log('Job failed: ', error);
});

module.exports = q;

module.exports.clearQueue = () => {
  kue.Job.rangeByState('active', 0, 100, 'asc', function(err, jobs) {
    jobs.forEach(function(job) {
      job.remove(function() {console.log('removed active: ', job.id)});
    });
  });
  kue.Job.rangeByState('complete', 0, 100, 'asc', function(err, jobs) {
    jobs.forEach(function(job) {
      job.remove(function() {console.log('removed completed: ', job.id)});
    });
  });
  kue.Job.rangeByState('inactive', 0, 100, 'asc', function(err, jobs) {
    jobs.forEach(function(job) {
      job.remove(function() {console.log('removed inactive: ', job.id)});
    });
  });
  kue.Job.rangeByState('failed', 0, 100, 'asc', function(err, jobs) {
    jobs.forEach(function(job) {
      job.remove(function() {console.log('removed failed: ', job.id)});
    });
  });
};

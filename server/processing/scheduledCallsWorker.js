/**
 * Worker wakes up at specific intervals,
 * gets all users who have calls scheduled for the next 15 minutes,
 * queues them up in the scheduled_call queue
 */
const cron = require('node-cron');
const q = require('../queue.js');
const User = require('../models/users.js');
const CallPreferences = require('../models/call-preferences.js');
const Call = require('../calling/config.js');
const CallLog = require('../models/call-logs.js');

const SCHEDULED_CALL = 'scheduled_call';

const _addToQueue = call => (
  User.findById(call.user_id)
    .then(user => (
      new Promise((resolve, reject) => {
        q.create(SCHEDULED_CALL, {
          user_id: user.user_id,
          phone: user.phone,
          call_pref: call.time_of_day,
          type: 'scheduled_call'
        }).removeOnComplete(true).save((err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve('Success');
          }
        });
      })
    ))
);
module.exports._addToQueue = _addToQueue;

module.exports = cron.schedule('15 * * * * *', () => {
  console.log('ScheduledCallsWorker Running...', new Date());
  const now = new Date();
  const nowHour = now.getHours().toString();
  const nowMinutes = now.getMinutes();
  let min;
  if (nowMinutes >= 0 && nowMinutes < 15) {
    min = '00';
  } else if (nowMinutes >= 15 && nowMinutes < 30) {
    min = '15';
  } else if (nowMinutes >= 30 && nowMinutes < 45) {
    min = '30';
  } else if (nowMinutes >= 45 && nowMinutes < 60) {
    min = '45';
  }

  CallPreferences.getAllByHour(nowHour, min)
    .then((callPreferences) => {
      console.log('SCW: Call preferences for the hour: ', callPreferences.length);
      if (!callPreferences) {
        throw new Error(`No Calls for Hour: ${nowHour}:${min}`);
      }
      callPreferences.forEach((call) => {
        CallLog.hasBeenCalledToday(call.user_id)
          .then((result) => {
            if (result.length === 0) {
              _addToQueue(call);
            } else {
              console.log('user has been called today: ', result);
            }
          });
      });
    })
    .then(() => {
      q.process(SCHEDULED_CALL, (job, done) => {
        Call.call(job.data)
          .then(() => {
            done();
          });
      });
    })
    .catch((err) => {
      console.error(err);
    });
}, false);

const cron = require('node-cron');
const searchClient = require('../searchClient.js');
const EntryText = require('../models/entry-text.js');

module.exports = cron.schedule('30 * * * * *', () => {
  EntryText.findNotIndexed()
    .then((entries) => {
      const bulkBody = [];

      entries.forEach((entry) => {
        bulkBody.push({
          index: {
            _index: 'entries',
            _type: 'entry_text',
            _id: entry.entry_id
          }
        });
        bulkBody.push(entry);
      });

      let promise;
      if (bulkBody.length > 0) {
        promise = searchClient.bulk({ body: bulkBody });
      } else {
        promise = Promise.resolve({ items: [] });
      }
      return promise;
    })
    .then(({ items }) => {
      items.forEach((item) => {
        const indexedItems = [];
        if (item.index && !item.index.error) {
          indexedItems.push(EntryText.updateByEntryId(item.index._id, 'is_indexed', true));
        } else {
          indexedItems.push(Promise.reject(item.index.error));
        }
        return Promise.all(indexedItems);
      });
    })
    .then(() => {
      console.log('Success indexing entries');
    })
    .catch((error) => {
      console.log('Error indexing entries', error);
    });
}, false);

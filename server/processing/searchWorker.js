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
            _id: entry.entry_text_id
          }
        });
        bulkBody.push(entry);
      });
      if (bulkBody.length > 0) {
        return searchClient.bulk({ body: bulkBody });
      } else {
        return Promise.resolve({ items: [] });
      }
    })
    .then(({ items }) => {
      items.forEach((item) => {
        const indexedItems = [];
        if (item.index && !item.index.error) {
          indexedItems.push(EntryText.update(item.index._id, 'is_indexed', true));
        } else {
          indexedItems.push(new Error(item.index.error));
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

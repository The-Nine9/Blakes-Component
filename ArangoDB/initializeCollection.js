const db = require('./initializeDB');

const collection = db.collection('listings');

collection.create().then(
  () => console.log('Collection created'),
  (err) => console.error('Failed to create collection:', err),
);

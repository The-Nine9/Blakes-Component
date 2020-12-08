const db = require('./initializeDB');

const collection = db.collection('firstCollection');

collection.truncate()
  .then(
    () => console.log('Truncated collection'),
  )
  .catch((err) => {
    console.error('Found existing collection');
  });

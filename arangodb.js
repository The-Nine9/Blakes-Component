const db = require('arangojs')();


db.createDatabase('mydb')
  .then(
    () => console.log('Database created'),
    (err) => console.error('Failed to create database:', err),
  );
db.useDatabase('mydb'); // add to above promise?

const schema = {
  message: 'Customer Validation Failed',
  level: 'strict',
  rule: {
    type: 'object',
    properties: {
      listing_id: {
        type: 'number',
        min: 0,
      },
      address: {
        type: 'string',
        minLength: 2,
        maxLength: 100,
        pattern: /^\d+\s[A-z]+\s[A-z]+/g,
      },
      price: {
        type: 'number',
        minimum: 0,
        maximum: 1000000000,
      },
      bed: {
        type: 'number',
        minimum: 0,
        maximum: 20,
      },
      bath: {
        type: 'number',
        minimum: 0,
        maximum: 20,
      },
      images: {
        type: 'array',
        miniItems: 5,
        maxItems: 80,
      },
      sale: { // would like to refactor to be status (enum [ sale, pending, new, construction ])
        type: 'boolean',
      },
      pending: {
        type: 'boolean',
      },
      new: {
        type: 'boolean',
      },
      construction: {
        type: 'boolean',
      },
    },
    required: [
      'listing_id',
      'sale',
      'address',
      'price',
      'bed',
      'bath',
      'images',
    ],
    additionalProperties: 'False',
  },
};
db.drop('listings');
db.create('listings', { schema })
  .then(
    () => console.log('Collection created'),
    (err) => console.error('Failed to create collection:', err),
  );

/* Bulk Seeding example
let docs = [];
for (i = 0; i < 100; i++) {
  docs.push({_key: `doc${i + 1}`, value: i});
}
collection.import(docs).then(
  result => console.log('Import complete:', result),
  err => console.error('Import failed:', err)
);
*/

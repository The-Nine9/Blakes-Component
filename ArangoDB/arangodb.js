/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable quotes */
/* eslint-disable indent */
const db = require('arangojs')();

const cred = require('./credentials');

const collection = db.collection('firstCollection');

db.createDatabase('mydb').then(
  () => console.log('Database created'),
  (err) => {
    console.error('Failed to create database: err');
  },
);
// db.createDatabase('mydb');
db.useDatabase('mydb');


collection.create().then(
  () => console.log('Collection created'),
  (err) => console.error('Failed to create collection:', err),
);

collection.truncate().then(
  () => console.log('Truncated collection'),
  (err) => console.error('Failed to truncate:', err),
);
// initialize connection with default attributes
// check for "listings" collection
  // yes? then drop
  // no? do nothing
// create new listing collection

// / IF USING ARANGO GRAPH \

/* our edge collections will only contain valid edges and you
will never have loose ends. These guarantees are lost if you
access the collections in any other way than the graph
module, so if you delete documents from your vertex
collections directly, the edges pointing to them will be
remain in place. */

// nested schemas --
// add user account obj,
// listing schema, add saved comp
// full address schema

var listingSchema = { // remove ALL constraints for seeds
  message: 'Customer Validation Failed',
  level: 'strict',
  rule: {
    type: 'object',
    properties: {
      listing_id: { // add index???
        type: 'number',
        min: 0,
      },
      address: {
        type: 'string',
        minLength: 2,
        maxLength: 100,
        pattern: "/^\\d+\\s[A-z]+\\s[A-z]+/g",
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
        default: true,
      },
      pending: {
        type: 'boolean',
        default: false,
      },
      new: {
        type: 'boolean',
        default: false,
      },
      construction: {
        type: 'boolean',
        default: false,
      },
      listing_agents: { // add index???
        agent_no: {
          type: 'number',
          min: 0,
        },
        first_name: {
          type: 'string',
          minLength: 1,
          maxLength: 20,
        },
        last_name: {
          type: 'string',
          minLength: 1,
          maxLength: 20,
        },
        email: {
          type: 'email',
          minLength: 5,
          maxLength: 30,
        },
        phone: {
          type: 'string',
          minLength: 10,
          maxLength: 22,
          pattern: "/^[\\(]{0,1}([0-9]){3}[\\)]{0,1}[ ]?([^0-1]){1}([0-9]){2}[ ]?[-]?[ ]?([0-9]){4}[ ]*((x){0,1}([0-9]){1,5}){0,1}/",
        },
      },
      users: {
        user_no: { // add index???
          type: 'number',
          min: 0,
        },
        user_name: {
          type: 'string',
          minLength: 1,
          maxLength: 30,
        },
        pswhash: {
          type: 'string',
          minLength: 1,
          maxLength: 100,
        },
        //  'seeding side: UPDATE (query) SET pswhash = crypt(`newpassword`, gen_salt(`md5`))',
        first_name: {
          type: 'string',
          minLength: 1,
          maxLength: 20,
        },
        last_name: {
          type: 'string',
          minLength: 1,
          maxLength: 20,
        },
        email: {
          type: 'email',
          minLength: 5,
          maxLength: 30,
        },
        phone: {
          type: 'string',
          minLength: 10,
          maxLength: 22,
          pattern: "/^[\\(]{0,1}([0-9]){3}[\\)]{0,1}[ ]?([^0-1]){1}([0-9]){2}[ ]?[-]?[ ]?([0-9]){4}[ ]*((x){0,1}([0-9]){1,5}){0,1}/", // EXTREME CAUTION, HIGHLY RATED BUT MAY BE TOO COMPLEX
        },
        owner_status: { // must be select type on front end, also strict per Capitalization
          type: 'string',
          enum: [
            'Property Owner',
            'Property Manager',
            'Bank Owned',
          ],
        },
        rental_applications: {
          type: 'boolean',
          default: false,
        },
      },
      amenities: {
        amenities_no: { // add index???
          type: 'number',
          minimum: 0,
        },
        ac: {
          type: 'boolean',
          default: false,
        },
        balcony_deck: {
          type: 'boolean',
          default: false,
        },
        furnished: {
          type: 'boolean',
          default: false,
        },
        hardwood: {
          type: 'boolean',
          default: false,
        },
        wheelchair: {
          type: 'boolean',
          default: false,
        },
        garage_parking: {
          type: 'boolean',
          default: false,
        },
        off_street_parking: {
          type: 'boolean',
          default: false,
        },
        laundry: {
          type: 'boolean',
          default: false,
        },
        pets: {
          type: 'boolean',
          default: false,
        },
      },
    },
    required: [
      'listing_id',
      'address',
      'price',
      'beds',
      'baths',
      'sale',
      'pending',
      'new',
      'construction',
      'description',
      'sqft',
      'shared',
      'property_type',
      'listing_agent',
      'user',
      'amenities',
      'images',
    ],
    additionalProperties: false,
  },
};

// EXAMPLE

const exampleData = {
  listing: {
    _ref: 'address', // ????
    listing_no: 1,
    address: '13123 street ave, City, State, 91232',
    price: 1243121,
    beds: 2,
    baths: 2,
    sale: true,
    pending: false,
    new: true,
    construction: false,
    description: 'long string',
    sqft: 1231,
    shared: false,
    property_type: 'condo/apt, home, single family home, or building',
    listing_agent: {
      agent_no: 1, // add index???
      first_name: 'sasd',
      last_name: 'sasd',
      email: 'sasd@asda.com',
      phone: '(913)212-3123',
    },
    user: {
      user_no: 1, // add index???
      user_name: 'asdasd',
      pswhash: 'seeding side: UPDATE (query) SET pswhash = crypt(`newpassword`, gen_salt(`md5`))',
      first_name: 'sasd',
      last_name: 'sasd',
      email: 'sasd@asda.com',
      phone: '(913)212-3123',
      owner_status: 'enum: property owner, ',
      rental_applications: true,
    },
    amenities: {
      amenities_no: 1, // add index???
      ac: true,
      balcony_deck: true,
      furnished: true,
      hardwood: true,
      wheelchair: true,
      garage_parking: true,
      off_street_parking: true,
      laundry: true,
      pets: true,
    },
    images: [
      'url1',
      'url2',
      'url3',
      'url4',
    ],
  },
};

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

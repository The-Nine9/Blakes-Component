/* eslint-disable no-restricted-syntax */
require('newrelic');
const { Database, aql } = require('arangojs');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
// const controller = require('../controllers/listing.js');
// const arango = require('../ArangoDB/connection');

const config = require('../ArangoDB/config');

const db = new Database(config);

const listings = db.collection('listings');

// const path = require('path')

const app = express();
const PORT = 8040;

app.use(bodyParser.json());

app.use(compression());
// app.get('/listings/:id/db', controller.getAll);

app.listen(PORT);

// CRUD

// app.get('/db', controller.get);

app.get('/*/:id/homesData', async (req, res) => {
  try {
    const listing = await db.query(aql`
      FOR listing in ${listings}
      Filter listing['_key'] == ${req.params.id}
      LIMIT 1
      RETURN listing
    `);
    for await (const item of listing) {
      res.json([{
        listing_id: item['_key'],
        topHeader: {
          sale: item.sale,
          pending: item.pending,
          new: item.new,
          construction: item.construction,
        },
        address: item.address,
        price: item.price,
        bed: item.beds,
        bath: item.baths,
        images: item.images,
      }]);
    }
  } catch (err) {
    res.status(400).send();
  }
});

app.use('/home/:id', express.static('client/dist'));
// app.post('/*/:id/addHomeData', controller.post);
// app.put('/*/:id/updateHomeData', controller.put);
// app.delete('/*/:id/removeHomeData', controller.remove);

// app.patch('/*/:id/gallery', controller.addImage);

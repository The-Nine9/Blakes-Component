require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/listing.js');
const arango = require('../ArangoDB/controller/listings');

// const path = require('path')

const app = express();
const PORT = 8040;

app.use(bodyParser.json());
app.use('/gallery/:id', express.static('client/dist'));

// app.get('/listings/:id/db', controller.getAll);

app.listen(PORT, () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});

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
      res.json(item);
    }
  } catch (err) {
    res.status(400).send();
  }
});
app.post('/*/:id/addHomeData', controller.post);
app.put('/*/:id/updateHomeData', controller.put);
app.delete('/*/:id/removeHomeData', controller.remove);

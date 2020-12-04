const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controllers/listing.js');

// const path = require('path')

const app = express();
const PORT = 8040;

app.use(bodyParser.json());
app.use('/home/:id', express.static('client/dist'));

// app.get('/listings/:id/db', controller.getAll);

app.listen(PORT, () => {
  console.log(`Listening on 127.0.0.1:${PORT}`);
});

// CRUD

// app.get('/db', controller.get);
app.get('/*/:id/gallery', controller.getListings);
app.post('/*/:id/gallery', controller.post);
app.put('/*/:id/gallery', controller.put);
app.delete('/*/:id/gallery', controller.remove);
app.patch('/*/:id/gallery', controller.addImage);

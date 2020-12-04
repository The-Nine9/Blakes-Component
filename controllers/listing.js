const listings = require('../db/schema.js');
const mongo = require('../db/mongo.js');

/* eslint-disable array-callback-return */
// const schema = require('../db/schema.js');
module.exports = {
  getListings: (req, res) => {
    // if(typeof req.params.id !== "number") {
    //   res.sendStatus(403)
    // }
    const query = listings.ListingsModel.where({ listing_id: req.params.id });
    mongo.connect();
    query.find((err, data) => {
      if (err) {
        res.sendStatus(404);
        console.log(err.message);
        mongo.db.close();
      } else {
        res.status(200).send(data);
        mongo.db.close();
      }
    });
  },

  post: (req, res) => {
    mongo.connect();
    listings.write(req.body, (err) => {
      if (err) {
        res.sendStatus(404);
        console.log(err.message);
        mongo.db.close();
      } else {
        res.sendStatus(201);
        mongo.db.close();
      }
    });
  },

  put: (req, res) => {
    mongo.connect();
    const query = listings.ListingsModel.where({ listing_id: req.params.id });
    listings.updateListing(query, req.body, (err) => {
      if (err) {
        res.sendStatus(404);
        console.log(err.message);
        mongo.db.close();
      } else {
        res.sendStatus(202);
        mongo.db.close();
      }
    });
  },

  remove: (req, res) => {
    mongo.connect();
    const query = listings.ListingsModel.where({ listing_id: req.params.id });
    listings.removeListing(query, (err) => {
      if (err) {
        res.sendStatus(404);
        console.log(err.message);
        mongo.db.close();
      } else {
        res.sendStatus(202);
        mongo.db.close();
      }
    });
  },

  addImage: (req, res) => {
    mongo.connect();
    listings.ListingsModel.find({ listing_id: req.params.id })
      .then((response) => { response[0].images.push(req.body.url); response[0].save(); res.status(201).send('success'); })
      .catch((err) => { console.log(err); mongo.db.close(); res.status(400).send('error'); });
  },

};

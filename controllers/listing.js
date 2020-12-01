var listings = require('../db/schema.js');
var mongo = require('../db/mongo.js');

/* eslint-disable array-callback-return */
// const schema = require('../db/schema.js');

getListings = (req, res) => {
  // if(typeof req.params.id !== "number") {
  //   res.sendStatus(403)
  // }
  const query = listings.ListingsModel.where({ listing_id: req.params.id });
  mongo.connect();
  query.find((err, listings) => {
    if (err) {
      res.status(404)
      console.log(err.message);
      mongo.db.close();
    } else {
      res.status(200).send(listings);
      mongo.db.close();
    }
  }
  )
}

post = (req, res) => {
  mongo.connect();
  listings.write(req.body, (err, data) => {
    if (err) {
      res.status(404).send('error');
      console.log(err.message);
      mongo.db.close();
    } else {
      res.status(200).send(data);
      mongo.db.close();
    }
  })
}

put = (req, res) => {
  mongo.connect();
  const query = listings.ListingsModel.where({ listing_id: req.params.id });
  listings.updateListing(query, req.body, (err) => {
    if (err) {
      res.status(404).send('error');
      console.log(err.message);
      mongo.db.close();
    } else {
      res.status(200).send('success');
      mongo.db.close();
    }
  })
}

remove = (req, res) => {
  mongo.connect();
  const query = listings.ListingsModel.where({ listing_id: req.params.id });
  listings.removeListing(query, (err) => {
    if (err) {
      res.status(404).send('error');
      console.log(err.message);
      mongo.db.close();
    } else {
      res.status(200).send('success');
      mongo.db.close();
    }
  })
}

module.exports = {
  getListings,
  post,
  put,
  remove,
}



























// module.exports = {
//   get: (req, res) => {
//     mongo.connect();
//     const query = schema.Listing.where({ id: req.params.id });
//     query.findOne((err, data) => {
//       if (err) {
//         res.status(404);
//         mongo.db.close();
//       } else {
//         res.status(200).send(data);
//         mongo.db.close();
//       }
//     });
//   },
//   getAll: (req, res) => {
//     mongo.connect();
//     schema.getAllListings.find((err, data) => {
//       if (err) {
//         res.status(404);
//       } else {
//         res.status(200).send(data);
//         mongo.db.close();
//       }
//     });
//   },
// };



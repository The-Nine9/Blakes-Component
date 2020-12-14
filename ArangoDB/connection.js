const { Database, aql } = require('arangojs');

const config = require('./config');

const db = new Database(config);

const listings = db.collection('listings');

module.exports = {
  getAll: async (req, res) => {
    try {
      const listing = await db.query(aql`
        FOR listing in ${listings}
        Filter listing['_key'] == ${req.params.id}
        LIMIT 1
        RETURN listing
      `);
      for await (const item of listing) { // i hate you
        res.json(item);
      }
    } catch (err) {
      res.status(400).send();
    }
  },
};

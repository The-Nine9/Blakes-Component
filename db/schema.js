Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore

@Blake-Whitham
Learn Git and GitHub without any code!
Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.


The-Nine9
/
Main-Gallery
0
0
0
Code
Issues
Pull requests
1
Actions
Projects
Wiki
Security
Insights
Settings
Main-Gallery/db/schema.js /
@Blake-Whitham
Blake-Whitham Corrected API Design
Latest commit 68ce682 2 days ago
 History
 2 contributors
@BrandonRussell2020@Blake-Whitham
48 lines (38 sloc)  958 Bytes

var mongoose = require('mongoose');
var mongo = require('./mongo.js');

mongoose.connect('mongodb://localhost/main-gallery-listings');

const listingSchema = mongoose.Schema ({
  listing_id: Number,
  topHeader: {
    sale: Boolean,
    pending: Boolean,
    new: Boolean,
    construction: Boolean,
  },
  address: String,
  price: Number,
  bed: Number,
  bath: Number,
  images: Array,

})

let ListingsModel = mongoose.model('Listing', listingSchema);


function write(listing, callback) {
  ListingsModel.create(listing, callback);
}

function getAllListings(callback) {
  ListingsModel.find({}, callback);
}

function updateListing(query, newData, callback) {
  ListingsModel.findOneAndUpdate(query, newData, callback);
}

function removeListing(query, callback) {
  ListingsModel.deleteOne(query, callback);
}

module.exports = {
  ListingsModel,
  write,
  getAllListings,
  updateListing,
  removeListing,
}
exports.getAllListings = getAllListings;

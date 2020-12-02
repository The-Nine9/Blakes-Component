var mongoose = require('mongoose');
var mongo = require('./mongo.js');

mongoose.connect('mongodb://localhost/main-gallery-listings');

const listingSchema = mongoose.Schema({
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
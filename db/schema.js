const mongoose = require('mongoose');
const mongo = require('./mongo.js');

mongoose.connect('mongodb://localhost/main-gallery-listings');

const listingSchema = mongoose.Schema({
  listing_id: Number, // need to maintain reference to all document data
  topHeader: {        // isolated for front end ease, could seperate into individuals for storage
    sale: Boolean,
    pending: Boolean,
    new: Boolean,
    construction: Boolean,
  },
  address: String, // most be unique and formatted correctly, maybe break it up into parts of address?
  price: Number,   //
  bed: Number,     // limited options could seperate for storage optimization
  bath: Number,    // limited options could seperate for storage optimization
  images: Array,   // hmmmmmm

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
};
exports.getAllListings = getAllListings;

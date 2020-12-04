const mongoose = require('mongoose');
const Schema = require('./db/schema.js');
const fs = require('fs');
const path = require('path');
// let faker = require('faker');

// TODO:
// 1) Take out hardcoded data and create helper functions to generate inputs.
// 2) Drop database before wrtiting to again.
function seedDB () {
  fs.writeFileSync(filePath, randomData )
}

function createRecord(... args) { // will this work
  const listing = {
    listing_id, //formerly -> : listingID,
    topHeader: { topHeader }, // will this work?
    address,
    price,
    bed,
    bath,
    images,
  }
  return listing;
}

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function listingGalleryGenerator(currentFolder) {
  let images = [];
  if(currentFolder === 1) {
    let counter = 1;
    while(counter <= 77) {
      let url = `https://s3-us-west-1.amazonaws.com/hackreactor.fec.trulia.photos/Home1/Home-1-${counter}.jpg`
      images.push(url)
      counter++;
    }
  } else {
    if(currentFolder === 2) {
      let counter = 1;
      while(counter <= 31) {
      let url = `https://s3-us-west-1.amazonaws.com/hackreactor.fec.trulia.photos/Home2/Home-2-${counter}.jpg`
      images.push(url)
      counter++;
      }
    } else {
    if(currentFolder === 3) {
      let counter = 1;
      while(counter <= 39) {
        let url = `https://s3-us-west-1.amazonaws.com/hackreactor.fec.trulia.photos/Home3/Home-3-${counter}.jpg`
        images.push(url)
        counter++;
        }
      }
    }
  }
  return images;
};

function seedDB(entries) {
  let created = 1;
  let folder = 1;
  let address= '232 Clinton Park';
  let price = 1875000;
  let bed = 4;
  let bath = 3;
  while (created <= 100) {
    // Image folder assignment and url generator
    let images = listingGalleryGenerator(folder);
    if(folder === 1) {
      address= '232 Clinton Park';
      price = 1875000;
      bed = 4;
      bath = 3;
    }
    if(folder === 2) {
      address= '4137 Hidden Oaks Rd';
      price = 65000000;
      bed = 10;
      bath = 7;
    }
    if(folder === 3) {
      address= '23800 Malibu Crest Dr';
      price = 1495000;
      bed = 4;
      bath = 2;
      folder = 0;
    }
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
const fs = require('fs');
const path = require('path');

let file;

// // LISTING
// listing_no SERIAL
// address
// price
// bed
// bath
// sale
// pending
// new
// construction
// description
// sqft
// shared
// property_type

function listingCSV(count) {
  file = path.join(__dirname, 'z_csv/listings.csv');
  const stream = fs.createWriteStream(file);

  stream.write('address,price,bed,bath,sale,pending,new,construction,description,sqft,shared,property_type\n');
  while (count > 0) {
    stream.write('"42 lorem way, ipsum, CA, 94040",2500000,2,3,1,0,0,0,this is a description of the home,12000,0,Single Family Home\n');
    count--;
  }
}

// // AGENT
// agent_no SERIAL
// first_name
// last_name
// email
// phone

function agentCSV(count) {
  file = path.join(__dirname, 'z_csv/agents.csv');
  const stream = fs.createWriteStream(file);

  stream.write('agent_name,first_name,last_name,email,phone\n');
  while (count > 0) {
    stream.write('Chuck,Norris,Chuckster@gmail.com,(818) 555-5555\n');
    count--;
  }
}

// // USER
// user_no SERIAL
// user_name
// pswhash
// first_name
// last_name
// email
// phone
// owner_status
// rental_applications
function userCSV(count) {
  file = path.join(__dirname, 'z_csv/users.csv');
  const stream = fs.createWriteStream(file);

  stream.write('user_name,pswhash,first_name,last_name,email,phone,owner_status,rental_applications\n');
  while (count > 0) {
    stream.write('HunkNorris815,AF765FA983F,Chuck,Norris,Chuckster@gmail.com,(818) 555-5555,Home Owner, 0\n');
    count--;
  }
}

// // AMENITIES
// ac
// balcony_deck
// furnished
// hardwood
// wheelchair
// garage_parking
// off_street_parking
// laundry
// pets
function amenitiesCSV(count) {
  file = path.join(__dirname, 'z_csv/amenities.csv');
  const stream = fs.createWriteStream(file);
  stream.write('ac,balcony_deck,furnished,hardwood,wheelchair,garage_parking,off_street_parking,laundry,pets\n');
  while (count > 0) {
    stream.write(`${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},\n`);
    count--;
  }
}

// // IMAGES
// image_no SERIAL
// url
// description
function imageCSV(count) {
  file = path.join(__dirname, 'z_csv/images.csv');
  const stream = fs.createWriteStream(file);

  stream.write('image_no,url,description\n');
  while (count > 0) {
    stream.write('https://picsum.photos/200/300,This is a photo of a house\n');
    count--;
  }
}

module.exports = {
  agentCSV,
  amenitiesCSV,
  imageCSV,
  listingCSV,
  userCSV,
};

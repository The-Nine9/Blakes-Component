/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
const fs = require('fs');
const path = require('path');

const file = {
  listing: path.join(__dirname, 'z_csv/listings.csv'),
  agents: path.join(__dirname, 'z_csv/agents.csv'),
  user_data: path.join(__dirname, 'z_csv/user_data.csv'),
  amenities: path.join(__dirname, 'z_csv/amenities.csv'),
  images: path.join(__dirname, 'z_csv/images.csv'),
};

const stream = {
  listing: fs.createWriteStream(file.listing),
  agents: fs.createWriteStream(file.agents),
  user_data: fs.createWriteStream(file.user_data),
  amenities: fs.createWriteStream(file.amenities),
  images: fs.createWriteStream(file.images),
};

const data = {
  listing: '"42 lorem way, ipsum, CA, 94040",2500000,2,3,1,0,0,0,this is a description of the home,12000,0,Single Family Home\n',
  agents: 'Chuck,Norris,Chuckster@gmail.com,(555) 555-5555\n',
  user_data: 'HunkNorris815,AF765FA983F,Chuck,Norris,Chuckster@gmail.com,(818) 555-5555,Home Owner, 0\n',
  amenities: `${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())},${Math.round(Math.random())}\n`,
  images: 'https://picsum.photos/200/300,This is a photo of a house\n',
};

const columns = {
  listing: 'address,price,bed,bath,sale,pending,new,construction,description,sqft,shared,property_type\n',
  agents: 'first_name,last_name,email,phone\n',
  user_data: 'user_name,pswhash,first_name,last_name,email,phone,owner_status,rental_applications\n',
  amenities: 'ac,balcony_deck,furnished,hardwood,wheelchair,garage_parking,off_street_parking,laundry,pets\n',
  images: 'url,description\n',
};

function callbackFunc(dataName, err) {
  if (err) {
    console.log(`everything got fucked up because of ${err}`);
  } else {
    console.log(`finished seeding ${dataName}`);
  }
}

async function createCSV(writer, content, encoding, callback, columns, rows) {
  let i = rows;
  await write();
  function write() {
    let ok = true;
    do {
      if (i === rows) {
        // first time! write header
        writer.write(columns, encoding);
      }
      i--;
      if (i === 0) {
        // Last time!
        writer.write(content, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(content, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}

createCSV(stream.listing, data.listing, 'utf8', () => callbackFunc('listings'), columns.listing, 10000000);
createCSV(stream.user_data, data.user_data, 'utf8', () => callbackFunc('user_data'), columns.user_data, 10000000);
createCSV(stream.agents, data.agents, 'utf8', () => callbackFunc('agents'), columns.agents, 10000000);
createCSV(stream.amenities, data.amenities, 'utf8', () => callbackFunc('amenities'), columns.amenities, 10000000);
createCSV(stream.images, data.images, 'utf8', () => callbackFunc('images'), columns.images, 50000000);

module.exports = {
  file,
  columns,
  listing: () => { createCSV(stream.listing, data.listing, 'utf8', callbackFunc('listings'), columns.listing, 10000000); },
  user_data: () => { createCSV(stream.user_data, data.user_data, 'utf8', callbackFunc('user_data'), columns.user_data, 10000000); },
  agents: () => { createCSV(stream.agents, data.agents, 'utf8', callbackFunc('agents'), columns.agents, 10000000); },
  amenities: () => { createCSV(stream.amenities, data.amenities, 'utf8', callbackFunc('amenities'), columns.amenities, 10000000); },
  images: () => { createCSV(stream.images, data.images, 'utf8', callbackFunc('images'), columns.images, 50000000); },
};

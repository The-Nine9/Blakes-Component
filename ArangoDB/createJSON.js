/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
const { exec } = require('child_process');
const { LoremIpsum } = require('lorem-ipsum');
const fs = require('fs');
const path = require('path');
const c = require('./collections.js');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const file = {
  listing: path.join(__dirname, 'z_json/listings.json'),
  listing1: path.join(__dirname, 'z_json/listings1.json'),
  listing2: path.join(__dirname, 'z_json/listings2.json'),
  listing3: path.join(__dirname, 'z_json/listings3.json'),
  listing4: path.join(__dirname, 'z_json/listings4.json'),
};

const stream = {
  listing: fs.createWriteStream(file.listing),
  listing1: fs.createWriteStream(file.listing1),
  listing2: fs.createWriteStream(file.listing2),
  listing3: fs.createWriteStream(file.listing3),
  listing4: fs.createWriteStream(file.listing4),
};

const num10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const boolean = [1, 0, 0, 1, 1, 0, 1, 0];
const propertyType = ['Single Family Home', 'Apartment', 'Condo', 'Cabin'];
const status = ['Owner', 'Realtor', 'Bank Representative'];
function addressMaker(i) {
  return `${c.num[i % c.num.length]} ${c.street[i % c.street.length]}, ${c.city[i % c.city.length]}, ${c.state[i % c.state.length]} ${c.zip[i % c.zip.length]} `;
}
function randomizer(arr, num) {
  return `${arr[num % arr.length]}`;
}
function imageStacker(num) {
  const images = [];
  const total = (num % 74) + 1;
  for (let i = 0; i < total; i++) {
    images.push('https://picsum.photos/200/300');
  }
  return images;
}

function createListing(num) {
  const listing = {
    _key: num.toString(), // ????
    address: addressMaker(num),
    price: randomizer(c.price, num),
    beds: randomizer(num10, num),
    baths: randomizer(num10, num),
    sale: randomizer(boolean, num + 1),
    pending: randomizer(boolean, num + 2),
    new: randomizer(boolean, num + 3),
    construction: randomizer(boolean, num + 4),
    description: lorem.generateSentences(2),
    sqft: randomizer(c.sqft, num),
    shared: randomizer(boolean, num + 5),
    property_type: randomizer(propertyType, num),
    listing_agent: {
      first_name: randomizer(c.firstName, num),
      last_name: randomizer(c.lastName, num),
      email: randomizer(c.emails, num),
      phone: randomizer(c.phone, num),
    },
    owner: {
      user_name: randomizer(c.firstName, num),
      pswhash: randomizer(c.passwords, num),
      first_name: randomizer(c.firstName, num + 1),
      last_name: randomizer(c.lastName, num + 2),
      email: randomizer(c.emails, num + 3),
      phone: randomizer(c.phone, num + 4),
      owner_status: randomizer(status, num),
      rental_applications: randomizer(boolean, num + 6),
    },
    amenities: {
      ac: randomizer(boolean, num + 1),
      balcony_deck: randomizer(boolean, num + 2),
      furnished: randomizer(boolean, num + 3),
      hardwood: randomizer(boolean, num + 4),
      wheelchair: randomizer(boolean, num + 5),
      garage_parking: randomizer(boolean, num + 6),
      off_street_parking: randomizer(boolean, num + 7),
      laundry: randomizer(boolean, num + 8),
      pets: randomizer(boolean, num + 9),
    },
    images: imageStacker(num),
  };
  return `${JSON.stringify(listing)}\n`;
}

function callbackFunc(dataName, err) {
  if (err) {
    console.log(`everything got fucked up because of ${err}`);
  } else {
    console.log(`finished seeding ${dataName}`);
  }
  stream.listing.end();
}

async function createJSON(writer, encoding, callback, start, stop, perc) {
  let i = stop;
  let num = start;
  await write();
  function write() {
    let ok = true;
    do {
      i--;
      const listing = createListing(num);
      num++;
      if (i === start) {
        // Last time!
        writer.write(listing, encoding, callback);
      } else {
        if (i % 100000 === 0) {
          perc++;
          exec(`cowsay -f head-in ${perc}%`, (error, stdout, stderr) => {
            console.log(stdout);
          });
        }
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(listing, encoding);
      }
    } while (i > 0 && ok);
    if (i > start) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
const seed = () => {
  createJSON(stream.listing, 'utf8', () => callbackFunc('listings'), 1, 2000000, 0);
  createJSON(stream.listing1, 'utf8', () => callbackFunc('listings'), 2000001, 4000000, 20);
  createJSON(stream.listing2, 'utf8', () => callbackFunc('listings'), 4000001, 6000000, 40);
  createJSON(stream.listing3, 'utf8', () => callbackFunc('listings'), 6000001, 8000000, 60);
  createJSON(stream.listing4, 'utf8', () => callbackFunc('listings'), 8000001, 10000000, 80);
};
seed();

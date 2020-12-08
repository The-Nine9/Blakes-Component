/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
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
  listing: path.join(__dirname, 'z_csv/listings.csv'),
  agent: path.join(__dirname, 'z_csv/agents.csv'),
  owner: path.join(__dirname, 'z_csv/owner.csv'),
  amenities: path.join(__dirname, 'z_csv/amenities.csv'),
  images: path.join(__dirname, 'z_csv/images.csv'),
};

const stream = {
  listing: fs.createWriteStream(file.listing),
  agent: fs.createWriteStream(file.agent),
  owner: fs.createWriteStream(file.owner),
  amenities: fs.createWriteStream(file.amenities),
  images: fs.createWriteStream(file.images),
};

const columns = {
  listing: 'address,price,bed,bath,sale,pending,new,construction,description,sqft,shared,property_type,agent,owner,amenities\n',
  agent: 'first_name,last_name,email,phone\n',
  owner: 'user_name,pswhash,first_name,last_name,email,phone,owner_status,rental_applications\n',
  amenities: 'ac,balcony_deck,furnished,hardwood,wheelchair,garage_parking,off_street_parking,laundry,pets\n',
  images: 'listing_no,url,description\n',
};

const num10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const boolean = [1, 0, 0, 1, 1, 0, 1, 0];
const propertyType = ['Single Family Home', 'Apartment', 'Condo', 'Cabin'];
const status = ['Owner', 'Realtor', 'Bank Representative'];
function addressMaker(i) {
  return `${c.num[i % c.num.length]} ${c.street[i % c.street.length]} ${c.suffix[i % c.suffix.length]}\, ${c.city[i % c.city.length]}\, ${c.state[i % c.state.length]} ${c.zip[i % c.zip.length]}`;
}
function randomizer(arr, num) {
  return `${arr[num % arr.length]}`;
}

function createListing(num) {
  return `"${addressMaker(num)}",${randomizer(c.price, num)},${randomizer(num10, num)},${randomizer(num10, num)},${randomizer(boolean, num + 1)},${randomizer(boolean, num + 2)},${randomizer(boolean, num + 3)},${randomizer(boolean, num + 4)},${lorem.generateSentences(2)},${randomizer(c.sqft, num)},${randomizer(boolean, num + 5)},${randomizer(propertyType, num)},${num},${num},${num}\n`;
}
function createAgent(num) {
  return `${randomizer(c.firstName, num)},${randomizer(c.lastName, num)},${randomizer(c.emails, num)},${randomizer(c.phone, num)}\n`;
}
function createOwner(num) {
  return `${randomizer(c.userName, num)},${randomizer(c.passwords, num)},${randomizer(c.firstName, num + 4)},${randomizer(c.lastName, num + 4)},${randomizer(c.emails, num + 4)},${randomizer(c.phone, num + 4)},${randomizer(status, num)},${randomizer(boolean, num + 6)}\n`;
}
function createAmenities(num) {
  return `${randomizer(boolean, num + 1)},${randomizer(boolean, num + 2)},${randomizer(boolean, num + 3)},${randomizer(boolean, num + 4)},${randomizer(boolean, num + 5)},${randomizer(boolean, num + 6)},${randomizer(boolean, num + 7)},${randomizer(boolean, num + 8)},${randomizer(boolean, num + 9)}\n`;
}
function createImages(num) {
  return `${(num % 10000000)},https://picsum.photos/200/300,${lorem.generateSentences(1)}\n`;
}

async function createCSV(target, rows) {
  function callbackFunc(dataName, err) {
    if (err) {
      console.log(`everything got fucked up because of ${err}`);
    } else {
      console.log(`finished seeding ${dataName}`);
    }
  }
  let writer;
  let header;
  let content;
  if (target === 'listing') {
    writer = stream.listing;
    header = columns.listing;
    content = createListing;
  }
  if (target === 'agent') {
    writer = stream.agent;
    header = columns.agent;
    content = createAgent;
  }
  if (target === 'owner') {
    writer = stream.owner;
    header = columns.owner;
    content = createOwner;
  }
  if (target === 'amenities') {
    writer = stream.amenities;
    header = columns.amenities;
    content = createAmenities;
  }
  if (target === 'images') {
    writer = stream.images;
    header = columns.images;
    content = createImages;
  }

  let i = rows;
  await write();
  function write() {
    let ok = true;
    do {
      if (i === rows) {
        // first time! write header
        writer.write(header, 'utf8');
      }
      if (i === 0) {
        // Last time!
        writer.write(content(i), 'utf8', () => callbackFunc(target));
        i--;
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(content(i), 'utf8');
        i--;
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}

createCSV('listing', 10000000);
createCSV('owner', 10000000);
createCSV('agent', 10000000);
createCSV('amenities', 10000000);
createCSV('images', 50000000);

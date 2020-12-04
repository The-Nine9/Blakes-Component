const fs = require('fs');
const path = require('path');
const pop = require('./csvGen');

// pop.agentCSV(1);
// pop.amenitiesCSV(1);
// pop.imageCSV(50);
// pop.listingCSV(1);
// pop.userCSV(1);

function imageCSV(count) {
  file = path.join(__dirname, 'z_csv/images.csv');
  const stream = fs.createWriteStream(file);

  stream.write('image_no,url,description\n');
  while (count > 0) {
    stream.write('https://picsum.photos/200/300,This is a photo of a house\n');
    count--;
  }
}

function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 50000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}

writeOneMillionTimes(
  fs.createWriteStream(path.join(__dirname, 'z_csv/images.csv')),
  'https://picsum.photos/200/300,This is a photo of a house\n',
  'utf8',
  (err, data) => {
    if (err) {
      console.log('everything got fucked up');
    } else {
      console.log('finished seeding images');
    }
  },
);

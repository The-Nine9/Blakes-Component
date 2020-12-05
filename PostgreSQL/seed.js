const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { Pool } = require('pg');

const gen = require('./createCSV');
gen.listing();
gen.agents();
gen.user_data();
gen.amenities();
gen.images();
const credentials = require('./credentials');

// const pool = new Pool(credentials);

const connectAndSeed = (columns, path) => {
  pool.query(`\copy images(${columns}) FROM ${path} DELIMITER ',' CSV HEADER;`, (err, res) => {
    console.log(err, res);
    pool.end();
  });
};

// \copy images(url, description) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/images.csv' DELIMITER ',' CSV HEADER;

// \copy agent(first_name, last_name, email, phone) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/agents.csv' DELIMITER ',' CSV HEADER;

// \copy user_data(user_name, pswhash, first_name, last_name, email, phone, owner_status, rental_applications) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/user_data.csv' DELIMITER ',' CSV HEADER;

// \copy amenities(ac, balcony_deck, furnished, hardwood, wheelchair, garage_parking, off_street_parking, laundry, pets) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/amenities.csv' DELIMITER ',' CSV HEADER;

// \copy listing(address, price, bed, bath, sale, pending, new, construction, description, sqft, shared, property_type) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/listing.csv' DELIMITER ',' CSV HEADER;

const importCSV = async (columns, path) => {
  console.log('Importing...');
  try {
    const { stdout, stderr } = await exec(`\copy agents(${columns}) FROM ${path} DELIMITER ',' CSV HEADER;`);
    if (stdout) { console.log(`Output: ${stdout}`); }
    if (stderr) { console.log(`Err: ${stderr}`); }
  } catch (err) {
    console.log(`${err}`);
  }
};
// importCSV(gen.columns.agents, gen.file.agents);
// connectAndSeed(gen.columns.agents, gen.file.agents);

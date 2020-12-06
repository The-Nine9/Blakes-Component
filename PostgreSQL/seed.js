const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { Pool } = require('pg');

const columns = {
  listing: 'address,price,bed,bath,sale,pending,new,construction,description,sqft,shared,property_type',
  agents: 'first_name, last_name, email, phone',
  user_data: 'user_name,pswhash,first_name,last_name,email,phone,owner_status,rental_applications',
  amenities: 'ac,balcony_deck,furnished,hardwood,wheelchair,garage_parking,off_street_parking,laundry,pets',
  images: 'url,description',
};

const gen = require('./createCSV');

// const credentials = require('./credentials');

// NODE -> POSTGRESQL METHOD   NON-FUNCTIONAL

// UNCOMMENT BELOW TO INITIALIZE CONNECTION W/ DB
// const pool = new Pool(credentials);
const connectAndSeed = (columns, path) => {
  pool.query(`\copy images(${columns}) FROM ${path} DELIMITER ',' CSV HEADER;`, (err, res) => {
    console.log(err, res);
    pool.end();
  });
};

// NODE -> TERMINAL -> POSTGRESQL METHOD   NON-FUNCTIONAL

const importCSV = async (columns, path) => {
  console.log('Importing...');
  // const cmd1 = "psql -U postgres -p 'blake' & \\c gallery";
  const command = `"\\copy agents(${columns}) FROM '${path}' DELIMITER ',' CSV HEADER;"`;
  console.log(command);
  try {
    await gen.listing();
    await gen.agents();
    await gen.user_data();
    await gen.amenities();
    await gen.images();
    const { stdout, stderr } = await exec(command);
    if (stdout) { console.log(`Output: ${stdout};`); }
    if (stderr) { console.log(`Err: ${stderr};`); }
  } catch (err) {
    console.log('whoops', err);
  }
};
importCSV(columns.agents, gen.file.agents);
// connectAndSeed(gen.columns.agents, gen.file.agents);

// BELOW IS ANALOG COPY/PASTE -> PSQL TERMINAL METHOD   FUNCTIONAL

// \copy images(url, description) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/images.csv' DELIMITER ',' CSV HEADER;

// \copy agent(first_name, last_name, email, phone) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/agents.csv' DELIMITER ',' CSV HEADER;

// \copy user_data(user_name, pswhash, first_name, last_name, email, phone, owner_status, rental_applications) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/user_data.csv' DELIMITER ',' CSV HEADER;

// \copy amenities(ac, balcony_deck, furnished, hardwood, wheelchair, garage_parking, off_street_parking, laundry, pets) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/amenities.csv' DELIMITER ',' CSV HEADER;

// \copy listing(address, price, bed, bath, sale, pending, new, construction, description, sqft, shared, property_type) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/listing.csv' DELIMITER ',' CSV HEADER;
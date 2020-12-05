DROP DATABASE IF EXISTS gallery;
CREATE DATABASE gallery;
-- WITH
--    [OWNER =  admin]
--    [TEMPLATE = template]
--    [ENCODING = encoding]
--    [LC_COLLATE = collate]
--    [ALLOW_CONNECTIONS = true]
--    [CONNECTION LIMIT = -1] -- huhh
--    [IS_TEMPLATE = false ];

\c gallery;

DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS agents;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS amenities;
DROP TABLE IF EXISTS listing;

CREATE TABLE listing (
  listing_no SERIAL PRIMARY KEY,
  address VARCHAR(50) NOT NULL, --unique after seeding
  price INTEGER NOT NULL, -- CHECK ( price > 0 AND price < 1000000000),
  bed SMALLINT NOT NULL, -- CHECK ( bed > 0 AND bed < 100 ),
  bath SMALLINT NOT NULL,-- CHECK ( bath > 0 AND bath < 100 ),
  sale BOOLEAN NOT NULL, -- lose "not null" -> default false
  pending BOOLEAN NOT NULL,
  new BOOLEAN NOT NULL,
  construction BOOLEAN NOT NULL,
  description VARCHAR(500) NOT NULL, -- add description
  sqft INTEGER NOT NULL,-- add sqftage
  shared BOOLEAN DEFAULT(false),
  property_type VARCHAR(30) NOT NULL
-- add listing agent foreign key
-- add user foreign key
-- add detail foreign key
);

-- add listing agent table (contact info)
CREATE TABLE agent (
  agent_no SERIAL PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  email VARCHAR(40) NOT NULL,
  phone VARCHAR(40) NOT NULL
);

--add user account table
CREATE TABLE user_data ( --updated the table name
  user_no SERIAL PRIMARY KEY,
  user_name VARCHAR(15) NOT NULL,
  pswhash VARCHAR(40) NOT NULL,-- using (crypt-des)  seeding side: UPDATE (query) SET pswhash = crypt('new password', gen_salt('md5'));
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  email VARCHAR(40) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  owner_status VARCHAR(20) NOT NULL,
  rental_applications BOOLEAN
);
--add listing ????????????????

-- home details table (extra)
CREATE TABLE amenities (
  amenities_no SERIAL PRIMARY KEY,
  ac BOOLEAN,
  balcony_deck BOOLEAN,
  furnished BOOLEAN,
  hardwood BOOLEAN,
  wheelchair BOOLEAN,
  garage_parking BOOLEAN,
  off_street_parking BOOLEAN,
  laundry BOOLEAN,
  pets BOOLEAN
  -- add details reference
);


CREATE TABLE images ( -- keep track of image order
  image_no SERIAL PRIMARY KEY,
  --listing INT NOT NULL FOREIGN KEY,
  url VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL -- LOSE IF SEEDING IS SLOW
    --CONSTRAINT fk_listing -- only used to give name to constraint (not required)
      --FOREIGN KEY(listing_no)-- lose foreign for seeding
	     -- REFERENCES listing(listing_no)
);

--CLIENT -> SERVER -> DB COPY METHOD EXAMPLE
-- \copy images(url, description) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/images.csv' DELIMITER ',' CSV HEADER;
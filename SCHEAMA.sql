CREATE DATABASE IF NOT EXISTS gallery;
-- WITH
--    [OWNER =  admin]
--    [TEMPLATE = template]
--    [ENCODING = encoding]
--    [LC_COLLATE = collate]
--    [ALLOW_CONNECTIONS = true]
--    [CONNECTION LIMIT = -1] -- huhh
--    [IS_TEMPLATE = false ];


DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS listing;
-- DROP TABLE IF EXISTS header;–

CREATE TABLE IF NOT EXISTS listing (
  listing_no SERIAL NOT NULL PRIMARY KEY,
  address VARCHAR(50) UNIQUE NOT NULL,
  price INTEGER NOT NULL, -- CHECK ( price > 0 AND price < 1000000000),
  bed SMALLINT NOT NULL, -- CHECK ( bed > 0 AND bed < 100 ),
  bath SMALLINT NOT NULL,-- CHECK ( bath > 0 AND bath < 100 ),
  sale BOOLEAN NOT NULL, -- lose "not null" -> default false
  pending BOOLEAN NOT NULL,
  new BOOLEAN NOT NULL,
  construction BOOLEAN NOT NULL,
  description VARCHAR(500) NOT NULL, -- add description
  sqft INTEGER NOT NULL,-- add sqftage
  shared BOOLEAN DEFAULT(0),
  property_type VARCHAR(30) NOT NULL,
-- add listing agent foreign key
-- add user foreign key
-- add detail foreign key
);

-- add listing agent table (contact info)
CREATE TABLE IF NOT EXISTS agents (
  agent_no SERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  email VARCHAR(40) NOT NULL,
  phone VARCHAR(40) NOT NULL,
);

--add user account table
CREATE TABLE IF NOT EXISTS users (
  user_no SERIAL NOT NULL PRIMARY KEY,
  user_name VARCHAR(15) NOT NULL,
  pswhash VARCHAR(40) NOT NULL,-- using (crypt-des)  seeding side: UPDATE (query) SET pswhash = crypt('new password', gen_salt('md5'));
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  email VARCHAR(40) NOT NULL,
  phone VARCHAR(40) NOT NULL,
  owner_status VARCHAR(20) NOT NULL,
  rental_applications BOOLEAN DEFAULT(0),
);
--add listing ????????????????

-- home details table (extra)
CREATE TABLE IF NOT EXISTS amenities (
  ac BOOLEAN DEFAULT(0),
  balcony_deck BOOLEAN DEFAULT(0),
  furnished BOOLEAN DEFAULT(0),
  hardwood BOOLEAN DEFAULT(0),
  wheelchair BOOLEAN DEFAULT(0),
  garage_parking BOOLEAN DEFAULT(0),
  off_street_parking BOOLEAN DEFAULT(0),
  laundry VARCHAR(20) DEFAULT(NULL),
  pets VARCHAR(20) DEFAULT(NULL),
  -- add details reference
);


CREATE TABLE IF NOT EXISTS images ( -- keep track of image order
  image_no SERIAL NOT NULL PRIMARY KEY,
  --listing INT NOT NULL FOREIGN KEY,
  url VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL, -- LOSE IF SEEDING IS SLOW
    --CONSTRAINT fk_listing -- only used to give name to constraint (not required)
      --FOREIGN KEY(listing_no)-- lose foreign for seeding
	     -- REFERENCES listing(listing_no)
);
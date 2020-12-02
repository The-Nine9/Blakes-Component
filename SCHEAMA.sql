CREATE DATABASE [IF NOT EXISTS] gallery
WITH
   [OWNER =  admin]
   [TEMPLATE = template]
   [ENCODING = encoding]
   [LC_COLLATE = collate]
   [ALLOW_CONNECTIONS = true]
   [CONNECTION LIMIT = -1]
   [IS_TEMPLATE = false ];


CREATE TABLE [IF NOT EXISTS] listing(
  listing_id SERIAL PRIMARY KEY,
  sale BOOLEAN,
  pending BOOLEAN,
  new BOOLEAN,
  construction BOOLEAN,
  address TEXT,
  price INTEGER,
  bed INTEGER,
  bath INTEGER,
  images TEXT[],
);

----------------------------------------------
[SECONDARY OPTION]
DROP TABLE IF EXISTS listing;
DROP TABLE IF EXISTS header;
DROP TABLE IF EXISTS images;

CREATE TABLE [IF NOT EXISTS] listing (
  listing_id SERIAL PRIMARY KEY,
  header INTEGER FOREIGN KEY,
  address TEXT,
  price INTEGER,
  bed INTEGER,
  bath INTEGER,
  PRIMARY KEY(header_id),
    CONSTRAINT fk_header
      FOREIGN KEY(header_id)
	      REFERENCES header(header_id)
);

CREATE TABLE [IF NOT EXISTS] header (
  header_id SERIAL PRIMARY KEY,
  sale BOOLEAN,
  pending BOOLEAN,
  new BOOLEAN,
  construction BOOLEAN,
);

CREATE TABLE [IF NOT EXISTS] images (
  listing INT,
  images TEXT,
    CONSTRAINT fk_listing
      FOREIGN KEY(listing_id)
	      REFERENCES listing(listing_id)
);
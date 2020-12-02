CREATE DATABASE [IF NOT EXISTS] gallery
WITH
   [OWNER =  admin]
   [TEMPLATE = template]
   [ENCODING = encoding]
   [LC_COLLATE = collate]
   [ALLOW_CONNECTIONS = true]
   [CONNECTION LIMIT = -1]
   [IS_TEMPLATE = false ];


DROP TABLE IF EXISTS listing;
DROP TABLE IF EXISTS header;
DROP TABLE IF EXISTS images;

CREATE TABLE [IF NOT EXISTS] listing (
  listing_no SERIAL NOT NULL PRIMARY KEY,
  header INTEGER NOT NULL FOREIGN KEY,
  address VARCHAR(50) UNIQUE NOT NULL,
  price INTEGER NOT NULL CHECK ( price > 0 AND price < 1000000000),
  bed SMALLINT NOT NULL CHECK ( bed > 0 AND bed < 100 ),
  bath SMALLINT NOT NULL CHECK ( bath > 0 AND bath < 100 ),
  PRIMARY KEY(header_no),
    CONSTRAINT fk_header
      FOREIGN KEY(header_no)
	      REFERENCES header(header_no)
);

CREATE TABLE [IF NOT EXISTS] header (
  header_no SERIAL NOT NULL PRIMARY KEY,
  sale BOOLEAN NOT NULL,
  pending BOOLEAN NOT NULL,
  new BOOLEAN NOT NULL,
  construction BOOLEAN NOT NULL,
);

CREATE TABLE [IF NOT EXISTS] images (
  image_no SERIAL NOT NULL PRIMARY KEY,
  listing INT NOT NULL FOREIGN KEY,
  images VARCHAR(100) NOT NULL,
    CONSTRAINT fk_listing
      FOREIGN KEY(listing_no)
	      REFERENCES listing(listing_no)
);
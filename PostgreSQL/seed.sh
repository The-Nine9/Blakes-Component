#!/bin/bash

# My first script
chmod 777 Postgres/csvGen.js

r=`tput setaf 1`;
g=`tput setaf 2`;
r=`tput sgr0`;
b=`tput blink`;
while true; do
    read -p "do you wish to create the CSV files?" yn
    case $yn in
        [Yy]* ) echo "This may take a moment";node PostgreSQL/createCSV.js; tput setaf 2; echo "ALL CSV FILES UPDATED"; tput sgr0; break;;
        [Nn]* ) echo "im sorry to hear that"; break;;
        * ) tput setaf 1; echo "Please answer yes or no."; tput sgr0 ;;
    esac
done

while true; do
    read -p "do you wish to drop and recreate all tables?" yn
    case $yn in
        [Yy]* ) echo "please enter your password";read pswd;echo "please enter the DB you wish to populate";read db; echo "BEGINNING TO SCURB DB"; PGPASSWORD=${pswd} psql -U postgres < PostgreSQL/schema.sql; tput setaf 2; echo "DB HAS BEEN SCRUBBED"; tput sgr0; break;;
        [Nn]* ) echo "im sorry to hear that"; break;;
        * ) tput setaf 1; echo "Please answer yes or no."; tput sgr0 ;;
    esac
done

while true; do
    read -p "do you wish to seed the DB?" yn
    case $yn in
        [Yy]* ) echo "BEGINNING TO SEED DB"; echo "SEEDING AGENTS TABLE"; PGPASSWORD=${pswd} psql -U postgres ${db} -c "\copy agent(first_name, last_name, email, phone) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/agents.csv' DELIMITER ',' CSV HEADER"; tput setaf 2; echo "AGENTS TABLE POPULATED"; tput sgr0; echo "SEEDING USER_DATA TABLE"; PGPASSWORD=${pswd} psql -U postgres ${db} -c "\copy user_data(user_name, pswhash, first_name, last_name, email, phone, owner_status, rental_applications) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/user_data.csv' DELIMITER ',' CSV HEADER;"; tput setaf 2; echo "USER_DATA TABLE POPULATED"; tput sgr0; echo "SEEDING AMENITIES TABLE"; PGPASSWORD=${pswd} psql -U postgres ${db} -c "\copy amenities(ac, balcony_deck, furnished, hardwood, wheelchair, garage_parking, off_street_parking, laundry, pets) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/amenities.csv' DELIMITER ',' CSV HEADER;"; tput setaf 2; echo "AMENITIES TABLE POPULATED"; tput sgr0; echo "SEEDING LISTING TABLE"; PGPASSWORD=${pswd} psql -U postgres ${db} -c "\copy listing(address, price, bed, bath, sale, pending, new, construction, description, sqft, shared, property_type) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/listings.csv' DELIMITER ',' CSV HEADER;"; tput setaf 2; echo "LISTING TABLE POPULATED"; tput sgr0; echo "SEEDING IMAGES TABLE"; PGPASSWORD=${pswd} psql -U postgres ${db} -c "\copy images(url, description) FROM '/Users/blake/Desktop/SDC/Main-Gallery/PostgreSQL/z_csv/images.csv' DELIMITER ',' CSV HEADER;"; tput setaf 2; echo "IMAGES TABLE POPULATED"; tput sgr0; echo "-------------SEEDING COMPLETE!!!---------------"; break;;
        [Nn]* ) tput setaf 1; echo "nay you say"; tput sgr0; exit;;
        * ) tput setaf 1; echo "Please answer yes or no."; tput sgr0 ;;
    esac
done



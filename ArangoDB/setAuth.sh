#!/bin/bash

# My first script
chmod 777 ArangoDB/setAuth.sh;
sudo brew services stop arangodb;
arangosh --server.endpoint tcp://127.0.0.1:8529 \
    --server.password "" \
    --javascript.execute-string 'require("org/arangodb/users").update("root", "blake");';
sudo brew services start arangodb;
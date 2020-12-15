#!/bin/bash

# My first script
  chmod 777 ArangoDB/setAuth.sh;
  cd /etc/yum.repos.d/;
  sudo curl -OL https://download.arangodb.com/arangodb37/RPM/arangodb.repo;
  sudo yum -y install arangodb3-3.7.5-1.0;
  sudo arango-secure-installation;
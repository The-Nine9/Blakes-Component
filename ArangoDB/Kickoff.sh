#!/bin/bash

## sudo yum install git -y
## curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
## . ~/.nvm/nvm.sh
## nvm install node
## node -e "console.log('Running Node.js ' + process.version)"
# My first script
  chmod 777 ArangoDB/setAuth.sh;
  sudo yum -y install cowsay
  cd /etc/yum.repos.d/;
  sudo curl -OL https://download.arangodb.com/arangodb37/RPM/arangodb.repo;
  sudo yum -y install arangodb3-3.7.5-1.0;
  sudo arango-secure-installation;
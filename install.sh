#!/bin/bash
#Install Node
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - ;
sudo apt install nodejs -y;

#Install Mongo
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add - ;
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list;
sudo apt-get update;
sudo apt-get install -y mongodb-org;

#Install deps
cd server/
npm install
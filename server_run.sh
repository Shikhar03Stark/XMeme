#! /bin/bash

#Start Mongo Service
sudo service mongod start;
service mongod status;

#kill previous port process
fuser -k 8081/tcp;

#Start node server
set NODE_ENV=production;
node server/server.js;

#! /bin/bash

#Start Mongo Service
sudo service mongod start;
service mongod status;

#Start node server
set NODE_ENV=production;
node server/server.js

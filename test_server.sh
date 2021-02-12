#!/bin/bash

#set up dir via git clone
git clone git@gitlab.crio.do:COHORT_ME_BUILDOUT_XMEME_ENROLL_1612436694845/harshit-vish321-me_buildout_xmeme.git
#cd to working directory
cd harshit-vish321-me_buildout_xmeme/
#Change perms for execution to all
sudo +x install.sh
#run dependency install
sudo ./install

#Change perms for execution for all
sudo +x server_run.sh
#run server.sh file in backgroud
./server_run.sh &

chmod +x sleep.sh
./sleep.sh

# ---Start invocation---

# Execute the GET /memes endpoint using curl to ensure your DB is in a clean slate

# Should return an empty array.

curl --location --request GET 'http://localhost:8081/memes'


# Execute the POST /memes endpoint using curl

curl --location --request POST 'http://localhost:8081/memes' \

--header 'Content-Type: application/json' \

--data-raw '{

"name": "xyz",

"url": "abc.com",

"caption": "This is a meme"

}'


# Execute the GET /memes endpoint using curl

curl --location --request GET 'http://localhost:8081/memes'


# If you have swagger enabled, make sure it is exposed at localhost:8080

#curl --location --request GET 'http://localhost:8080/swagger-ui/'

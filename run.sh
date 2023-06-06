#!/bin/bash

trap : TERM INT
set -e

ENVIRONMENT=prod
URL=https://sensi.ai/




if [[ "$ENVIRONMENT" == "" ]];
then 
    echo "No parameter passed."
    exit 1
else
    echo "Parameter passed = $ENVIRONMENT"
fi

if [[ "$URL" == "" ]];
then 
    echo "No parameter passed."
    exit 1
else
    echo "Parameter passed = $URL"
fi

# Install the dependencies in Node environment
npm install

# Install browsers
npx playwright install chromium

yes | NODE_ENV=$ENVIRONMENT BUCKET_URL=$URL npm run ci:test


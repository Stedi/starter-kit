#!/bin/sh

terraform init
npm install axios
zip -r /tmp/index.zip node_modules/ index.js
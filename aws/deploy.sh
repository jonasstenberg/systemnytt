#!/bin/bash

npm run build

cd dist && aws s3 cp . s3://systemnytt.se/dist --recursive --acl public-read --profile systemnytt --region eu-west-1

#!/bin/bash

# Generate static files
npm run build

# Upload dist folder to s3
cd dist && aws s3 cp . s3://systemnytt.se/dist --recursive --acl public-read --profile systemnytt --region eu-west-1

# Invalidate cache in CloudFront
aws cloudfront create-invalidation --distribution-id E1BBQ4CAGEREIL --paths "/*" --profile systemnytt

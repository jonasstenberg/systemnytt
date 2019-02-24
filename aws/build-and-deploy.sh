#!/bin/bash

# Generate static files
npm run build

# Upload dist folder to s3
cd dist && aws s3 sync . s3://systemnytt.se/ --acl public-read --region eu-north-1 --profile systemnytt --delete

# Invalidate cache in CloudFront
aws cloudfront create-invalidation --distribution-id E1BBQ4CAGEREIL --paths "/*" --profile systemnytt

#!/bin/bash
set -e

# check if AWS_ENVIRONMENTS exists 
[[ -z "${AWS_ENVIRONMENTS}" ]] && echo ">>> ERROR: There is no  AWS_ENVIRONMENTS variable!!!" && exit 1

BUCKET="$(jq ".bucket.${CI_ENVIRONMENT_NAME}" <<< "${AWS_ENVIRONMENTS}" |  xargs echo )"
echo "$BUCKET"
CLOUDFRONT="$(jq ".cloudfront.${CI_ENVIRONMENT_NAME}" <<< "${AWS_ENVIRONMENTS}" |  xargs echo)"
echo "$CLOUDFRONT"

echo "Set correct aws credential variables"
case ${CI_COMMIT_BRANCH} in 
    master)  
        AWS_REGION="${AWS_REGION_PRD}"
        AWS_CLIENT_KEY="${AWS_CLIENT_KEY_PRD}"
        AWS_CLIENT_SECRET="${AWS_CLIENT_SECRET_PRD}"
    ;;
    *)
        AWS_REGION="${AWS_REGION_DEV}"
        AWS_CLIENT_KEY="${AWS_CLIENT_KEY_DEV}"
        AWS_CLIENT_SECRET="${AWS_CLIENT_SECRET_DEV}"
    ;;
esac

aws configure set aws_access_key_id ${AWS_CLIENT_KEY}
aws configure set aws_secret_access_key ${AWS_CLIENT_SECRET}
aws configure set region ${AWS_REGION}

cd build/
aws s3  rm $BUCKET --recursive
aws s3  cp ./ $BUCKET --recursive
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT --paths "/*"

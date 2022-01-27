#!/bin/bash
set -e
strEnvs=('.env' '.env.local.json')

echo "Remove local environment files"
for env in "${strEnvs[@]}"
do
[[ -f  $env ]] && rm -f $env  \
  || echo ">>> There is nothing to clean!"
done

# check if ci/cd variable exist, or not empty
function exists() {
  [[ -z "$1" ]] && echo ">>> ERROR: There is no ${CI_ENVIRONMENT_NAME} ENV variable!!!" && exit 1
  echo "${CI_ENVIRONMENT_NAME} environment variable exists"
}

case ${CI_ENVIRONMENT_NAME} in 
    prd)  
      exists ${PRD_ENV}
      printf '%s' "${PRD_ENV}" > .env
    ;;
    stg)
      exists ${STG_ENV}
      printf '%s' "${STG_ENV}" > .env
    ;;
    *)
      exists ${DEV_ENV}
      printf '%s' "${DEV_ENV}" > .env
    ;;
esac

echo "Build process start"
npm run build

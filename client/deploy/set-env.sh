#!/bin/bash
env="dev"
case ${CI_COMMIT_BRANCH} in 
    main)  
      env="prd"
    ;;
    staging)
      env="stg"
    ;;
esac
echo $env

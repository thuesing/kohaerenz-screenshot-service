#!/bin/sh
# build, run, destroy docker dev container
docker kill dev
docker rm dev
docker build -t thuesing/dev .
docker run  --name="dev" -v $PWD:/srv -p 8080:80 -d thuesing/dev


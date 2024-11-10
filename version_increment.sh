#!/bin/bash

DOCKER_REPO=$1

latest_tag=$(docker pull ${DOCKER_REPO}:latest 2>/dev/null || echo "0.0-frontend")

if [[ $latest_tag =~ ([0-9]+)\.([0-9]+)-frontend ]]; then
    major=${BASH_REMATCH[1]}
    minor=${BASH_REMATCH[2]}
else
    major=0
    minor=0
fi

if [ "$minor" -ge 9 ]; then
    major=$((major + 1))
    minor=0
else
    minor=$((minor + 1))
fi

new_tag="${major}.${minor}-frontend"
echo $new_tag

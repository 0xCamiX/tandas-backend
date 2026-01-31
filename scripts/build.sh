#!/bin/bash
set -e

if [ ! -f .env ]; then
    echo "Error: .env file not found"
    exit 1
fi

source .env

if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL not set in .env"
    exit 1
fi

docker build \
    --secret id=DATABASE_URL,env=DATABASE_URL \
    -t yaku-rest-api \
    .

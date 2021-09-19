#!/bin/bash

docker-compose -f docker-compose.test.yml --env-file ./.env.dev up --build

exec "$@"
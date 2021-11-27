#!/bin/bash

if [[ "$1" == "apps" ]]; then
	docker-compose -f docker-compose.dev.yml --env-file ./.env.dev up --build --remove-orphans -d
	yarn --cwd ./backend dev & yarn --cwd ./frontend dev
else
	docker-compose -f docker-compose.dev.yml --env-file ./.env.dev up --build --remove-orphans
fi

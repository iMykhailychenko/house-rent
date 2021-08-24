#!/bin/sh

yarn remove bcrypt
yarn add bcrypt
yarn run clean
yarn run tsc
node dist/app.js

exec "$@"
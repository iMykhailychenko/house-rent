#!/bin/sh

yarn remove bcrypt
yarn add bcrypt

exec "$@"
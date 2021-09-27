FROM node:14-alpine

WORKDIR /app/admin/translations
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

FROM node:14-alpine

WORKDIR /app/admin/client
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

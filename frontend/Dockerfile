FROM node:14-alpine
WORKDIR /app/frontend
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
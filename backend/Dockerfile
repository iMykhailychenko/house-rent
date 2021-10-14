FROM node:14-alpine
WORKDIR /app/backend
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ENTRYPOINT ["./build.sh"]
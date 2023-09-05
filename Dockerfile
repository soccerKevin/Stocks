FROM node:16-bookworm
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install
RUN yarn run start
# RUN yarn install --network-timeout 100000
# RUN yarn build:prod
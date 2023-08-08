FROM node:18.7.0
WORKDIR /src/app
COPY package*.json /src/app
COPY yarn.lock /src/app
COPY /src /src/app/src
RUN yarn install --network-timeout 100000
RUN yarn build:prod
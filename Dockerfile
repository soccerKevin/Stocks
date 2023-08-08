FROM node:18.7.0
WORKDIR /src/app
COPY package*.json ./
COPY yarn.lock ./
COPY /src /src
RUN yarn install
EXPOSE 3000
RUN yarn run start

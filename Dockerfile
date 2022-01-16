FROM node:16.0.0
WORKDIR /src
COPY package.json ./
COPY yarn.lock ./
COPY /src /src
RUN yarn install
EXPOSE 3000
CMD ["yarn", "run", "dev"]

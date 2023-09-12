FROM node:16
WORKDIR /app
COPY package.json ./
RUN npm install yarn
RUN yarn install
COPY . .
EXPOSE 3000
RUN yarn run dev
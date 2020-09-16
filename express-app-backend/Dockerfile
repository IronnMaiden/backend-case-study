# Reference: https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:latest

LABEL author="Prashanth Puranik"
LABEL email="puranik@digdeeper.in"

# All shell commands we run will be from this directory
WORKDIR /usr/src/app

ENV PORT=10000
ENV NODE_ENV=development

EXPOSE ${PORT}

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "run", "start:docker" ]
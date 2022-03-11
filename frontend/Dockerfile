### Production build ###
# Base image as 'build' var
FROM node:17-alpine as build
# Conventional working directory
RUN mkdir -p /usr/src/app
# Using that directory
WORKDIR /usr/src/app
# Leverage Docker's cache layer by
# exposing all our Node.js binaries
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# copy package.json
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts -g --silent
ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}
COPY . /usr/src/app

CMD ["npm", "start"]

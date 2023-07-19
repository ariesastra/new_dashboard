FROM alpine:3.18 as build

ENV NODE_VERSION 20.4.0

WORKDIR /app
COPY package*.json yarn.lock ./

RUN yarn install
COPY . .

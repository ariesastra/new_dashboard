# Base Image
FROM node:18-alpine

RUN apk add --update nodejs npm yarn

# Create App Directory
WORKDIR /usr/src/app
# A wildcard to ensure all dependencies are copied
COPY package*.json yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build

EXPOSE 8000

ARG ENV_ARG
ENV NODE_ENV=$ENV_ARG
RUN echo $NODE_ENV

CMD [ "node", "dist/main" ]
FROM alpine:3.18 as build

ENV NODE_VERSION 20.4.0

WORKDIR /app
COPY package*.json yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build

EXPOSE 8000

ARG ENV_ARG
ENV NODE_ENV=$ENV_ARG

RUN echo $NODE_ENV

CMD [ "node", "dist/main" ]
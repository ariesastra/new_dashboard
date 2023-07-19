# Base Image
FROM node:18-alpine

# Using ENV for Production
ENV NODE_ENV production

# Create App Directory
WORKDIR /usr/src/app

# A wildcard to ensure all dependencies are copied
COPY package*.json yarn.lock ./

# Install All Dependencies
RUN yarn

# Bundle App Resource
COPY . .

# Create Production Build
RUN yarn build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
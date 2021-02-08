# Get docker image.
FROM node:14-alpine 

# Create Directory for the Container
WORKDIR /usr/src/app

# Copy files needed to build the project.
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY ./src ./src

# Once in production this can be set by ARGS and ENV
COPY .env ./

# Install dependencies
RUN yarn 
CMD [ "yarn", "start" ]
EXPOSE 4000
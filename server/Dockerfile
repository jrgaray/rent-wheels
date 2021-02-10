# Get docker image.
FROM node:14-alpine 

# Create Directory for the Container
WORKDIR /usr/src/app

# Copy files needed to build the project.
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY ./src ./src

# Once in production this can be set by ARGS and ENV
COPY .env .

# Install dependencies
RUN yarn 
COPY . .
CMD [ "yarn", "start" ]
EXPOSE 4000


# Sources: 
# https://medium.com/@VincentSchoener/development-of-nodejs-application-with-docker-and-typescript-part-2-4dd51c1e7766
# https://morioh.com/p/aed97925b139

# Get docker image.
FROM node:14-alpine 

# Create Directory for the Container
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY ./src ./src
RUN yarn 
ADD . /usr/src/app
CMD [ "yarn", "start" ]
EXPOSE 4000
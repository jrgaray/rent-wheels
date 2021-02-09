# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json . 
COPY yarn.lock . 
COPY tsconfig.json . 

RUN yarn --silent
RUN yarn add global react-scripts@4.0.2 --silent

# add app
COPY . .

# start app
CMD ["yarn", "start"]

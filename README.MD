# Rent Wheels

## Overview

This is a CRUD web application for cars. Users can log into their accounts and manage their vehicles.

Technologies of note used in this application are:

-   React
-   Redux
-   Create-React-App
-   GraphQL
-   Apollo Client/Server
-   Typescript
-   Node.js
-   Postgres/ElephantSQL
-   Material-UI
-   styled-components
-   react-hook-form
-   Docker

## Contents

-   [Quickstart](#quickstart)
    -   [Prerequistes](#prerequisites)
    -   [Starting Local Environment](#starting-development-environment)
-   [Project Requirements](#project-requirements)
-   [Development Process](#development-process)

## Quickstart

### Prerequisites

To run the application, ensure that the following application are installed on your machine:

-   [Docker](https://www.docker.com/get-started)
-   [Docker Compose](https://docs.docker.com/compose/install/)
-   [yarn](https://classic.yarnpkg.com/en/docs/install/)
-   [node](https://nodejs.org/en/download/)
-   [git](https://git-scm.com/downloads)

### Starting Development Environment

Once you have the prerequiste applications installed on your machine, clone this repository to your machine by using the following command:

`git clone https://github.com/jrgaray/rent-wheels.git`

After the repository is cloned to your machine, `cd` into the client directory and run:

`yarn`

Finally, run the last command to build the projects in their docker containers:

`docker-compose up --build`

Once the following is visible, the application is ready for viewing/development:

    rent_wheels_server | 🚀 Server ready at http://localhost:4000/
    rent_wheels_client | Compiled successfully!
    rent_wheels_client |
    rent_wheels_client | You can now view client in the browser.
    rent_wheels_client |
    rent_wheels_client | Local: http://localhost:3000
    rent_wheels_client | On Your Network: http://172.21.0.2:3000
    rent_wheels_client |
    rent_wheels_client | Note that the development build is not optimized.
    rent_wheels_client | To create a production build, use yarn build.
    rent_wheels_client |

🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉

## Project Requirements

Create your own single page web application that allows users to perform queries and commands to cars that they own using React as your frontend and Graphql/Node.js as your backend.

-   Use Apollo Server for the backend
-   Use React for the front end
-   No need for a persistence layer, data can be stored in memory or in JSON files.
-   Implement error handling
-   BE CREATIVE
-   Have some form of form validation.
-   Things we'd like to see, material-ui components, React hooks, Apollo Client.
-   (Optional) If you want, you can create a database for persistence.

The Car schema can be a simple JSON object and should include { id: string, make: string, model: string, year: string, VIN: string } at a minimum.

## Development Process

After receiving the requirements for this take home assignment, I immediately began brainstorming and planning my

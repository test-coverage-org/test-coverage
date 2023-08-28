# NodeJS Refactor

## Table of Contents

- [Challenge Description](#challenge-description)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Running the Application](#running-the-application)
    - [Development Environment](#development-environment)
    - [Production Environment](#production-environment)
- [Features](#features)
- [Improvements](#improvements)

## Challenge description

You have been provided with these database models and migrations, as well as the `listingController.js` file which
includes a single "update" function. The rest of the project has been lost for unknown reasons, but someone from the
team assures that they saw it working "fine" before.

Your objectives are:

1. Build a web API that exposes this functionality as an endpoint.
2. Add a new endpoint to the web API to create steps in bulk, for a given listing, by submitting a CSV file with the
   following header fields:

   ```
   flowId, name, step, listingFlow
   ```

Bear in mind that soon, more functionalities will need to be implemented, so it is expected that the code is readable,
robust, and maintainable.

If you feel that there are further important improvements that you cannot implement due to time constraints, you can
propose them in writing with a description of how you would approach them.

# Documentation

## Getting Started

These instructions will help you set up the project and run it on your local machine for development and production
purposes.

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/emilabs/challenge-MaximilianoAdaro.git
   cd challenge-MaximilianoAdaro
```

## Running the Application

- ### Development Environment

  To run the application in the _**development**_ environment, use the following command:

   ```bash
    npm run dev
  ```

    - This will start the development NodeJs **server** and the PostgreSQL **database**.
    - The server will run on port **8080**, and the database will be accessible on port **5435**.

- ### Production Environment

  To run the application in the _**production**_ environment, use the following command:

   ```bash
    npm run prod
  ```

    - This will start the production **server** and the PostgreSQL **database**.
    - The server will run on port **8081**, and the database will be accessible on port **5437**.

## Features

- [x] Web API that exposes the listing update functionality as an endpoint.
  Located in
  the [Listing controller](https://github.com/emilabs/challenge-MaximilianoAdaro/tree/master/node-refactor/src/domains/listing/listing.controller.js)

- `PUT /api/listing/:listing_id`


- [x] New endpoint to the web API to create steps in bulk, for a given listing, by submitting a CSV file with the
  following header fields: `flowId, name, step, listingFlow`
  Located in
  the [Step controller](https://github.com/emilabs/challenge-MaximilianoAdaro/blob/master/node-refactor/src/domains/step/step.controller.js)

- `POST /api/steps/create/bulk/:listing_id`


- [x] Added other endpoints to the web API to create, update, delete and get steps, listing, and other entities.
- [x] [Unit tests](https://github.com/emilabs/challenge-MaximilianoAdaro/tree/master/node-refactor/__test__) for the
  endpoints.
- [x] Eslint and Prettier configuration.
- [x] Docker configuration for development and production environments.
- [x] User and user role entities.
- [x] CI/CD pipeline with Github Actions for testing and building the application.

## Improvements

- [ ] Better Unit Tests, the ones I made are just a few examples.
- [ ] Build a Swagger documentation for the API.
- [ ] Implement JWT authentication and authorization.
- [ ] Add more validations to the endpoints.

**Author**: [_Maximiliano Adaro_](https://github.com/MaximilianoAdaro)

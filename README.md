# VocabuCards (_frontend_)

## Stack
This project was created with [Create React App](https://github.com/facebook/create-react-app).

The frontend is built on a React framework and makes extensive use of the Redux library.

The backend uses Flask for routing and is connected to a Postgres database.

## Deployment & Repositories

Heroku deployments:
* Frontend: [www.vocabucards.com](https://www.vocabucards.com)
* Backend: [api.vocabucards.com](https://api.vocabucards.com)

Git repositories:
* Frontend: [github.com/eckesm/VocabuCards_frontend](https://github.com/eckesm/VocabuCards_frontend)
* Backend: [github.com/eckesm/VocabuCards_backend](https://github.com/eckesm/VocabuCards_backend)

## Local Installation & Starting the Local Server

* Clone project from repository
* Navigate to teh project folder
* node is required to run the project; if necessary, run `npm install node`
* run `npm install` to install project dependancies
* create a .env file and create variables for the settings listed in the `.env.example` file
* run `npm start` to start the server


## Functionality, Calculations, & Additional Features

_See frontend documentation at: [https://github.com/eckesm/VocabuCards_frontend](https://github.com/eckesm/VocabuCards_frontend)_

## Backend API

The frontend sends requests to a custom backend API located at [https://api.vocabucards.com](https://api.vocabucards.com/)

This API is connected to a Postgres database and is responsible for handling all CRUD features of the website as well as querying external APIs.


## Available Scripts & Testing

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
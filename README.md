# KevExplorer

## Project organization

This is a Javascript monorepo composed of the following packages:

- `core`: Core features (scan a folder)
- `cli`: The CLI program
- `api`: Web API exposing core features
- `app`: Web application using the API

## Installation

Just run:

    yarn

## Run the CLI

    yarn cli

## Run the app

### Start the backend

With Docker:

    docker-compose up -d

In development mode:

    yarn api

The backend listens on http://localhost:8080.

A GraphiQL UI is available here: http://localhost:8080/graphiql

### Start the Web app

    yarn app
    
## TODO

- [ ] Fix ESLint
- [x] API
- [ ] Web app
- [ ] More documentation

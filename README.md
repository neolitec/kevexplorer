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

## Run the tests

All tests can be run with:

    yarn test

You can also get into a specific package and run the same command.
    
## TODO

### Frontend

- [ ] Tests (unit, e2e)
- [ ] Logs (Sentry)
- [ ] Analytics?
- [ ] Environment config
- [ ] Accessibility refinements
- [ ] Virtual scroll would be nice for very long lists
- [ ] i18n
- [ ] Better responsive
- [ ] Navigation history
- [ ] Caching folders content

### Backend (including the file scanner)

- [ ] Logs
- [ ] Environement configuration
- [ ] E2e tests

More about the scanner:

- [ ] [BUG] Handle the rights - sometimes you don't have a granted access to files, making the scanner crash
- [ ] [PERF] Limit the concurrency
- [ ] [PERF] Improve the memory footprint by limiting the depth of the tree in the memory
- [ ] [SECURITY] Give a folder as a root path (a jail) from which the user can't get out

### CLI

- [ ] Improve UX by handling autocompletion, history...
- [ ] The table could be better

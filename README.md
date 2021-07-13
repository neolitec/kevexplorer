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

    docker-compose up

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

For instance, run tests for the `cli` packages:

    cd packages/cli
    yarn test
    
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
- [ ] Authentication

### Backend (including the file scanner)

- [ ] Logs
- [ ] Environement configuration
- [ ] E2e tests

More about the scanner:

- [ ] [PERF] Better concurrency management. Currently, the limit of concurrency is 4... for each scanned folder. We could get a better management by using node Workers and push jobs into a pool that can provide a global limitation for those parallel tasks.
- [ ] [SECURITY] Give a folder as a root path (a jail) from which the user can't get out

**Known issue**

**Memory:** when the tree of files is too big, we hit a `JavaScript heap out of memory` error.
If you want run Node with more memory, you can set this environment variable:

    NODE_OPTION='--max-old-space-size=8192'

**Symlinks loops:** sometimes 

### CLI

- [ ] Improve UX by handling autocompletion, history...
- [ ] The table could be better

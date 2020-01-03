[![Actions Status](https://github.com/dsyncerek/pwa-rss-reader/workflows/ServerCI/badge.svg)](https://github.com/dsyncerek/pwa-rss-reader/actions)
[![Actions Status](https://github.com/dsyncerek/pwa-rss-reader/workflows/ClientCI/badge.svg)](https://github.com/dsyncerek/pwa-rss-reader/actions)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=dsyncerek/pwa-rss-reader&identifier=224730216)](https://dependabot.com)

# PWA RSS Reader

> A PWA which organizes your RSS sources.

## Demo

Live: [pwa-rss-reader.herokuapp.com](https://pwa-rss-reader.herokuapp.com/).

OpenAPI: [pwa-rss-reader.herokuapp.com/openapi](https://pwa-rss-reader.herokuapp.com/openapi/).

**NOTE**: Application will load after a short delay. Details [here](https://devcenter.heroku.com/articles/free-dyno-hours).

## Technologies

### Front-End

- [React](https://github.com/facebook/react) with hooks
- [Redux](https://github.com/reduxjs/redux) with [redux-thunk](https://github.com/reduxjs/redux-thunk), [reselect](https://github.com/reduxjs/reselect) and [immer](https://github.com/immerjs/immer)
- [Bootstrap](https://github.com/twbs/bootstrap)

### Back-End

- [Nest](https://github.com/nestjs/nest)
- [Express](https://github.com/expressjs/express)
- [TypeORM](https://github.com/typeorm/typeorm)
- [Swagger](https://github.com/swagger-api/swagger-ui)

## Installation

```
git clone https://github.com/dsyncerek/pwa-rss-reader.git
cd pwa-rss-reader
npm install
```

## Configuration

Rename `server/.env.example` to `server/.env`, `client/.env.example` to `client/.env` and edit with your needs.

## Usage

`npm run start:dev` runs application in development mode.

`npm run start:prod` runs application in production mode.

`npm run build` builds the project.

`npm run test` tests the project.

`npm run lint` lints the project using [eslint](https://github.com/eslint/eslint) and [stylelint](https://github.com/stylelint/stylelint).

`npm run format` formats the project using [prettier](https://github.com/prettier/prettier).

## [License](LICENSE)

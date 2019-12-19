[![Actions Status](https://github.com/dsyncerek/rss-reader/workflows/ServerCI/badge.svg)](https://github.com/dsyncerek/rss-reader/actions)
[![Actions Status](https://github.com/dsyncerek/rss-reader/workflows/ClientCI/badge.svg)](https://github.com/dsyncerek/rss-reader/actions)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=dsyncerek/rss-reader&identifier=224730216)](https://dependabot.com)

# RSS Reader

> todo 

## Demo

Live: [dsyncerek-rss-reader.herokuapp.com](http://dsyncerek-rss-reader.herokuapp.com/).

OpenAPI: [dsyncerek-rss-reader.herokuapp.com/openapi](https://dsyncerek-rss-reader.herokuapp.com/openapi/).

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
git clone https://github.com/dsyncerek/rss-reader.git
cd rss-reader
npm install
```

## Configuration

todo

## Usage

`npm run start:dev` runs application in development mode.

`npm run start:prod` runs application in production mode.

`npm run build` builds the project.

`npm run test` tests the project.

`npm run lint` lints the project using [eslint](https://github.com/eslint/eslint) and [stylelint](https://github.com/stylelint/stylelint).

`npm run format` formats the project using [prettier](https://github.com/prettier/prettier).

## [License](LICENSE)

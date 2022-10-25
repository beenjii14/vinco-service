# Vinco Service

> The technical test is for the Vinco team.

```text
Description service:
↪ The service is a REST API that allows you to create, read, update and delete users.
↪ Create session for users with cookies.
```

## Demo

- [Service](https://vinco-service.azurewebsites.net)
  > example: https://vinco-service.azurewebsites.net/api/v1/user
- [Client](https://vinco-client.vercel.app/)
  > ![Vinco](https://i.ibb.co/Xxt2MtX/Screen-Shot-2022-10-24-at-23-12-51.png)

**Structured and configured packages for the Vinco service.**

## Configured packages

- [Babel](https://babeljs.io/)
- [Jest](https://jestjs.io/)
- [Husky](https://typicode.github.io/husky/#/)
- [Winston](https://www.npmjs.com/package/winston)
- [Cors](https://www.npmjs.com/package/cors)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Mongoose](https://mongoosejs.com/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## Structure

This is the directory structure of the application.

```txt
  ├── .husky            ⟶ Hooks of husky
  ├── __tests__         ⟶ Tests of the application
  ├── build             ⟶ Build of the application
  ├── coverage          ⟶ Coverage of the application
  ├── config            ⟶ Variables of environment
  ├── src               ⟶ Source code
  │   ├── index.js      ⟶ Entry point of the application
  │   ├── messages.js   ⟶ Messages of the application
  │   ├── mongodb.js    ⟶ Connection of mongodb
  │   ├── controllers   ⟶ Controllers of the application
  │   ├── models        ⟶ Models of the application
  │   ├── routes        ⟶ Routes of the application
  │   ├── utils         ⟶ Utils of the application
```

## Prerequisites

- Install Node.js from [here](http://nodejs.org) >=16.14.0
- Install PNPM from [here](https://pnpm.io/es/installation) → Optional (is optional because you can use npm or yarn)
- Install Git from [here](https://git-scm.com/downloads)
- Have shell or command line (If you use Mac and Linux, you have a terminal pre-installed, if you are using windows you can use [git bash](https://git-scm.com/downloads))

## Development

```bash
# Clone the repo
git clone https://github.com/beenjii14/vinco-service.git

# Go to the project directory
cd vinco-service

# Configuration of the environment variables (description of the values in the next step)
cp .env.example .env

# Install dependencies
pnpm install

# Run the app
pnpm dev
```

[Configure the server by creating the .env file in the root of the project](#configuration)

The example structure is given in the [.env.example](.env.example) file

- Update `<PORT>` Port through which the server will run.
- Update `<ENV>` Environment in which the server will run.
- Update `<SERVICE_NAME>` Name of the service.
- Update `<MONGO_URI>` With the url of mongodb to work in the production environment
- Update `<MONGO_URI_TEST>` With the url of mongodb to work in the development environment
- Update `<SECRET>` With secret word to generate JWT token

## Production

```bash
# Clone the repo
git clone https://github.com/beenjii14/vinco-service.git

# Install dependencies
npm install

# Build the app
npm build

# Run the app
npm start
```

## User endpoints

| Endpoint            | HTTP   | Description       |
| ------------------- | ------ | ----------------- |
| `*/api/v1/user`     | POST   | Create a new user |
| `*/api/v1/user/:id` | PUT    | Update user       |
| `*/api/v1/user`     | GET    | Get all users     |
| `*/api/v1/user/:id` | GET    | Get user by id    |
| `*/api/v1/user/:id` | DELETE | Delete user by id |

Mandatory send params for the correct functioning:

- **id** (ObjectId): Unique user identifier.

## Auth endpoints

| Endpoint        | HTTP   | Description           |
| --------------- | ------ | --------------------- |
| `*/api/v1/auth` | POST   | Authenticate the user |
| `*/api/v1/auth` | DELETE | Log out               |

## Extra commands

Run the unit tests

```bash
# Run the unit tests with coverage
pnpm test

# Run the unit tests watch mode
pnpm test:watch
```

Run the eslint

```bash
pnpm lint
```

## [License MIT](LICENSE)

<h1 align="center">To-do List API</h1>

## About this project

The To-do List Project is a **fullstack** project made in early 2021.

This backend project is deployed on [Heroku](https://www.heroku.com/).

If you want to take a look on the frontend project (React), follow this link : [To-do-List React app](https://github.com/Corinne-Coding/To-Do-List-React-APP)

<br />

**Packages & libraries used :**

- [express](https://www.npmjs.com/package/express)
- [express-formidable](https://www.npmjs.com/package/express-formidable)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [twilio](https://www.twilio.com/)
- [crypto-js](https://www.npmjs.com/package/crypto-js)
- [uid2](https://www.npmjs.com/package/uid2)

<br />

## Routes documentation

### /signup (POST)

Add a new user in database

| Body       | Type   | Required |
| ---------- | ------ | -------- |
| `email`    | string | Yes      |
| `password` | string | Yes      |
| `username` | string | Yes      |

### /login (POST)

Log a user

| Body       | Type   | Required |
| ---------- | ------ | -------- |
| `email`    | string | Yes      |
| `password` | string | Yes      |

### /create/board (POST)

Create a new board

| Body    | Type   | Required |
| ------- | ------ | -------- |
| `title` | string | Yes      |

### /boards (GET)

Get all boards of the user

### /update/board/:id (PUT)

Update a board title

| Body    | Type   | Required |
| ------- | ------ | -------- |
| `title` | string | Yes      |

<br />

| Param | Required | Description |
| ----- | -------- | ----------- |
| `id`  | Yes      | board id    |

### /delete/board/:id

Delete a board and all tasks associated

| Param | Required | Description |
| ----- | -------- | ----------- |
| `id`  | Yes      | board id    |

### /create/task (POST)

Create a new task

| Body      | Type   | Required |
| --------- | ------ | -------- |
| `title`   | string | Yes      |
| `boardId` | string | Yes      |

### /tasks/:boardId (GET)

Get all tasks of a board

| Param     | Required | Description |
| --------- | -------- | ----------- |
| `boardId` | Yes      | board id    |

### /update/task/:id (PUT)

Update a task title or a task status

| Body    | Type   | Required |
| ------- | ------ | -------- |
| `title` | string | Yes      |

<br />

| Param | Required | Description |
| ----- | -------- | ----------- |
| `id`  | Yes      | task id     |

### /delete/task/:id (DELETE)

Delete a task

| Param | Required | Description |
| ----- | -------- | ----------- |
| `id`  | Yes      | task id     |

## Install and run project

You will need `node` and `yarn` or `npm` installed globally on your machine.

Clone this repository :

```bash
git clone https://github.com/Corinne-Coding/To-do-List-express-API.git
cd To-do-List-express-API
```

Install packages with `yarn` or `npm` :

```bash
yarn
```

or

```bash
npm install
```

When installation is complete, start the server :

```bash
npx nodemon
```

# Learn It React

React front end for Learn It API

# Setting up locally

- run `npm i` to install dependencies
- Add a .env file to the root of the application with the following settings

```
REACT_APP_API = 'http://localhost:3737' # or where ever your development server is running
PORT = 4242 # If you want to run the front end on a different port besides the default
```

# Running locally

`npm start`

# Tools

## Plugins

- Spell Checking plugin - https://github.com/streetsidesoftware/vscode-spell-checker
- Prettier - https://github.com/prettier/prettier-vscode

# Running tests

`npm test` to run unit tests locally

`npx cypress open` to run cypress locally

# Todo

## Sections

- [x] Flash cards

  - [ ] Save user responses

- [x] Loading component

  - [x] spinner icon / gif

- [ ] Admin section
  - [ ] add / update / delete
- [x] User auth

  - [ ] Change route on signin / signup success
  - [ ] Remember username
  - [ ] Hide show relevant links
  - [ ] ToDo list

- [ ] Fetch wrapper
- [ ] Error handling

- [ ] Multiple Choice

- [x] Subjects
- [x] Lessons
- [x] Cards
  - [x] Questions
  - [x] Answers
  - [x] Explanations
- [x] Header
- [x] Side Nav

- [ ] Protected routes
  - [ ] Roles
  - [ ] Permissions

## Add and set up

- [ ] Deploy to cloud
- [ ] CI
- [ ] Tests
  - [ ] Local
  - [ ] CI
- [x] Cypress
  - [ ] CI
- [ ] Typescript (or Flow?)
- [x] MUI
- [x] Hook Form
- [x] Prettier
- [x] Json-Server

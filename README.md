# Probot: Arborist

[![Join the chat at https://gitter.im/probot-arborist/Lobby](https://badges.gitter.im/probot-arborist/Lobby.svg)](https://gitter.im/probot-arborist/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

*This project is **still** in development*

> A GitHub App built with [probot](https://github.com/probot/probot) that validates new branches meet criteria and reports on branches that can be cut down.

## Setup

```
# Install dependencies
yarn install

# Run the bot
yarn start
```

## Usage

1. Install Probot Arborist
2. Create `.github/branch.yml`

A `.github/branch.yml` file is required to enable the plugin. The file can be empty, or it can override any of these default settings:

```yml
# Configuration for probot-arborist - https://github.com/Stargator/probot-arborist

# Name of the account used for the bot
botName: probot

# Regular expression pattern for new branch names must meet
branchNamePattern: [a-zA-Z-_]

# After a Pull Request was closed, this is the number of days the bot will wait to add related branch to issue.
daysAfterClose: 14

# After a Pull Request was merged, this is the number of days the bot will wait to add related branch to issue.
daysAfterMerge: 7

# Branches with these phrases will never be considered for deletion. Set to `[]` to disable
protectedBranches:
  - master
  - staging
  - develop
```

3. See [docs/deploy.md](docs/deploy.md), if you would like to run your own instance of this app.
  * For development/testing purposes, it is recommended to create a new repository and deploy the app to watch for events on it.

## Contributing

If you would like to contribute, please see the [task list](https://github.com/Stargator/probot-arborist/issues/1) and leave a comment if you want to take on one of the tasks.

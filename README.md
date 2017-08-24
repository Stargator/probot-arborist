# Probot: Arborist

*This project is **still** in development*

> A GitHub App built with [probot](https://github.com/probot/probot) that validates new branches meet criteria and reports on branches that can be cut down.

## Setup

```
# Install dependencies
npm install

# Run the bot
npm start
```

## Usage

1. **[Configure the GitHub Integration](https://github.com/integration/probot-arborist)**
2. Create `.github/branch.yml`

A `.github/branch.yml` file is required to enable the plugin. The file can be empty, or it can override any of these default settings:

```yml
# Configuration for probot-arborist - https://github.com/mcmahonjohn/arborist

# Name of the account used for the bot
botName: probot
# Regular expression pattern for new branch names must meet
branchNamePattern: [a-zA-Z-_]
# Number of days after a Pull Request was closed before branch should be deleted
daysUntilStale: 14
# Number of days after a Pull Request was merged before branch should be deleted
daysUntilClose: 7
# Branches with these phrases will never be considered for deletion. Set to `[]` to disable
exemptLabels:
  - master
  - staging
  - develop
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this plugin.

## Contributing

If you would like to contribute, please see the [task list](https://github.com/Stargator/probot-arborist/issues/1) and leave a comment if you want to take on one of the tasks.

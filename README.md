## Setup

### Prerequisites

Make sure you have node `v16`. This can be installed via `nvm` to preserve other
versions.

Run `yarn` to install the dependencies.

```
# nvm install 16
# nvm use 16
# yarn
```

### `.env.`

Create a [`.env`](https://github.com/motdotla/dotenv) file and add the
variables, which you find in `.env.sample`. `.env.sample` should be a full list
of environment variables that you need locally. If you deploy this project, the
deployment environment as well as the CI pipeline need these variables, too.

## Tech Stack

- NodeJS
- Prisma - Database orm
- Express - Web framework for Node.js
- AWS SDK
- Vitest

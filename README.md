# Console API

[![Build Status](https://travis-ci.com/open-cluster-management/console-api.svg?token=APpLzibLo9i2xU1nq9kC&branch=master)](https://travis-ci.com/open-cluster-management/console-api)

[Open Cluster Management](https://github.com/open-cluster-management) Console API Service for the [Console-UI](https://github.com/open-cluster-management/console-ui).

## Prerequisites

- [NodeJS](https://nodejs.org/)

  The build requires node.js version 10 as specified in the [.nvmrc](.nvmrc) file by the reference to [lts/dubnium](https://nodejs.org/en/about/releases/).
  
  1. Setup [nvm](https://github.com/nvm-sh/nvm) - a version manager for node.js, designed to be installed per-user, and invoked per-shell.

      ```
      brew install nvm
      echo "export NVM_DIR=~/.nvm" >> ~/.zshrc
      echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.zshrc
      echo "echo \"NodeJS Version: \`node -v\`   NPM Version: \`npm -v\`\"" >> ~/.zshrc
      ```

      This will run nvm on shell startup which will look for a .nvmrc and use the node version specified.

  2. Restart your shell.

  3. If nvm does not find the version, install it.

      ```
      nvm install
      nvm install-latest-npm
      ```

## Installation

1. Install dependencies

   ```
   npm ci
   ```

2. Run unit tests

   ```
   npm test
   ```

3. Run style checks

   ```
   npm run lint
   ```

4. Setup environment variables

   | Variable          | Description                   |
   | ----------------- | ----------------------------- |
   | API_SERVER_URL    | Cluster API server URL        |
   | SERVICEACCT_TOKEN | Cluster service account token |

    ```zsh
    export API_SERVER_URL=`oc get infrastructure cluster -o jsonpath={.status.apiServerURL}`
    export SERVICEACCT_TOKEN=`oc whoami -t`
    ```

5. Start the server

   **Development**

      ```
      npm start
      ```

   **Production**
  
      ```
      npm run build
      npm run start:production
      ```

6. Open [GraphiQL](https://localhost:4000/hcmuiapi/graphiql) UI

   ```
   open https://localhost:4000/hcmuiapi/graphiql
   ```

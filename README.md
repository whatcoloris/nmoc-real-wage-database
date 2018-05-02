This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Visit [their repository](https://github.com/facebookincubator/create-react-app) for more information and help.

### Remixing in Glitch

To make the auto-reload feature work:

* Edit the `proxy` option in `package.json` to point to your Glitch app.
* Disable the "Refresh App on Changes" checkbox in your user menu (top right).

### Changes made to the original boilerplate

Changes that were done to better integrate with Glitch:

* The `.env.development` file contains `DANGEROUSLY_DISABLE_HOST_CHECK=true` to fix the "Invalid host header" message that shows up, related to the development server.
* A custom `watch.json` file was added so that the server doesn't restart when you make changes.
* The `start` script in the `package.json` file was changed. if you run `npm run build` using the **Logs > Console** and then add `NODE_ENV=production` in the `.env` file, then Glitch will serve the production build version of your app!

For faster boot times when your app goes to sleep and wakes up, you may rename the `devDependencies` key in your `package.json` file to `_devDependencies`, so those get ignored. They aren't needed, as in production static files inside your `build` are used. To see the contents of this folder, open the **Logs > Console** and run `ls build`.

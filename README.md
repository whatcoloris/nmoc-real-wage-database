This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Visit [their repo](https://github.com/facebookincubator/create-react-app) for more information.

## Remixing in Glitch

To make the auto-reload feature work, edit the `proxy` option in `package.json` to point to your Glitch app. 

Other changes that were done to better integrate with Glitch:

* `.env.development` contains `DANGEROUSLY_DISABLE_HOST_CHECK=true` to fix the "Invalid host header" message that shows up, related to the development server
* The `start` script in the `package.json` file was changed. if you run `npm run build` using the **Console** and then add `NODE_ENV=production` in the `.env` file, then Glitch will serve the production build version of your app.
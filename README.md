# Emergency INDEX Vol. 8 Submission form

https://emergency-index-submission-2018.glitch.me/

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Visit [their repository](https://github.com/facebookincubator/create-react-app) for more information and help.

Shout-out to [Material-UI](https://material-ui.com/)

## Helpful information about the files:

#### Files that will probably need to be edited: 

The files inside `src/form/` directory contain most of the text snippits relevant to this form.

* `src/form/FormHeading.jsx` Text for the beginning of the form
* `src/form/FormInfo.jsx` Paragraph text that comes after the heading
* `src/form/ProjectForm.js` Fields for form questions
* `src/form/FormFooter.jsx` Text for the content after the form

ProjectForm includes a number of items for each individual response field that are defined like:

```js
{
  id: "some_field", // lower-case, no spaces or special characters
  label: "SOME FIELD LABEL",
  help: "This text will appear after the label",
  value: "", // place holder for what the user will enter
  required: true, // required or not
  error: false, // place holder for validation results
  validator: blankValidator // function for determining if field is valid
}
```

**NOTE:** if you decide to add/remove response field items then new submissions will not appear correctly (columns will not match up) on the google spreadsheet because the fields get mapped based on the fields in the first response. see: https://glitch.com/edit/#!/emergency-index-submission-2018?path=server.js:143:25  
```js
const fields = data[0].project_form.items.map( (item, idx) => ({label: item.id, value: `project_form.items.${idx}.value`, default: 'NULL'}) )
```  
#TODO: this code could be improved.  
also, if you remove field items then other parts of the code might break :/  

#### Other files

* `public/index.html` base HTML file 
* `src/components/FormField.jsx` a React component for form fields
* `src/App.jsx` main React component and logic for this form
* `src/App.test.js` a really simple test
* `src/index.css` global styles (use sparingly; prefer `createStyles()`)
* `src/index.js` entry point into app
* `src/withRoot.jsx` wrapper for Material-UI styles
* `util/*` misc nodeJS scripts for google & s3 API integrations. mostly just test stuff that isn't otherwise used.
* `.env` secret keyz for Google, s3 bucket, and /submissions access
* `server.js` nodeJS express server for handling HTTP requests
* `package.json` project data and npm dependencies
* `watch.json` special file for glitch to prevent automatic reloading when files change
* `.gitignore` files that will be omitted from git source control

## Creating a production build

* Run the command `npm run build` in the console (note: click **Logs > Console**)

## MISC

### Remixing in Glitch

To make the auto-reload feature work:

* Disable the "Refresh App on Changes" checkbox in your user menu (top right).

### Changes made to the original boilerplate

Changes that were done to better integrate with Glitch:

* The `.env.development` file contains `DANGEROUSLY_DISABLE_HOST_CHECK=true` to fix the "Invalid host header" message that shows up, related to the development server.
* A custom `watch.json` file was added so that the server doesn't restart when you make changes.
* The `start` and `build` scripts in the `package.json` file were changed.

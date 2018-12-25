'use strict'

const { google } = require('googleapis')

const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets',
]
const jwt = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY,
  scopes
)
const view_id = 'XXXXXXX'

jwt.authorize((err, response) => {
  
  google.sheets({
    version: 'v4',
    auth: sampleClient.oAuth2Client,
  });
  
  google.analytics('v3').data.ga.get(
    {
      auth: jwt,
      ids: 'ga:' + view_id,
      'start-date': '30daysAgo',
      'end-date': 'today',
      metrics: 'ga:pageviews'
    },
    (err, result) => {
      console.log(err, result)
    }
  )
})






'use strict';

const {google} = require('googleapis');
// const sampleClient = require('../sampleclient');

const sheets = google.sheets({
  version: 'v4',
  auth: sampleClient.oAuth2Client,
});

async function runSample(spreadsheetId, range) {
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        ['Justin', '1/1/2001', 'Website'],
        ['Node.js', '2018-03-14', 'Fun'],
      ],
    },
  });
  console.log(res.data);
  return res.data;
}

const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets',
];

if (module === require.main) {
  const [spreadsheetId, range] = process.argv.slice(2);
  sampleClient
    .authenticate(scopes)
    .then(() => runSample(spreadsheetId, range))
    .catch(console.error);
}

module.exports = {
  runSample,
  client: sampleClient.oAuth2Client,
};
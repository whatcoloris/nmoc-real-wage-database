'use strict'

console.log('ohey, have process.env.CLIENT_EMAIL?', process.env.CLIENT_EMAIL)
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
// const view_id = 'XXXXXXX'
const spreadsheetId = '1hmEYFZlpf0GV1kG2lZophXwzUSKL20v6nDycJVElAcs'
const range = 'Sheet1!A1:D1'


jwt.authorize((err, response) => {
  
  const res = google.sheets({
    version: 'v4',
    auth: jwt,
  }).spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        ['foo', 'bar', 'baz'],
        ['bl33p', 'zomg', 'zork'],
      ],
    },
  }, (err, result) => { 
    console.log('err:', err, ' result:', result)
  });
  console.log('res.data:', res.data);
  
  // google.analytics('v3').data.ga.get(
  //   {
  //     auth: jwt,
  //     ids: 'ga:' + view_id,
  //     'start-date': '30daysAgo',
  //     'end-date': 'today',
  //     metrics: 'ga:pageviews'
  //   },
  //   (err, result) => {
  //     console.log(err, result)
  //   }
  // )
})

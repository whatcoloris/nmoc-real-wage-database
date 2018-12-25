'use strict'

require('dotenv').config()
const { google } = require('googleapis')

const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets'
]
const jwt = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY,
  scopes
)
const spreadsheetId = '1hmEYFZlpf0GV1kG2lZophXwzUSKL20v6nDycJVElAcs'
const range = 'Sheet1!A1:Z1'

jwt.authorize((err, response) => {
  google.sheets({
    version: 'v4',
    auth: jwt,
  }).spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [Math.random(), 'foo', 'bar', 'baz', 'bl33p', 'zomg', 'zork'],
      ],
    },
  }, (err, result) => { 
    if(err){
      console.log('o noz! gsheet error!')
      console.log(err)
    }else{
      console.log('gsheet append success!') 
    }
  })
  
  google.drive('v3').files.create({
    requestBody: {
      title: 'Test',
      mimeType: 'text/plain',
    },
    media: {
      mimeType: 'text/plain',
      body: 'Hello World!',
    },
    auth: jwt,
  }, (err, result) => { 
    if(err){
      console.log('o noz! gdrive error!')
      console.log(err)
    }else{
      console.log('gdrive  success!') 
    }
  });
})

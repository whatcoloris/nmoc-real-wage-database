'use strict';

const {google} = require('googleapis');
const drive = google.drive('v3');
const sampleClient = require('./sampleclient');

async function runSamples() {
  // insertion example
  let res = await drive.files.insert({
    requestBody: {
      title: 'Test',
      mimeType: 'text/plain',
    },
    media: {
      mimeType: 'text/plain',
      body: 'Hello World updated with metadata',
    },
    auth: sampleClient.oAuth2Client,
  });
  console.log(res.data);

  // update with no metadata
  res = await drive.files.update({
    fileId: '0B-skmV2m1Arna1lZSGFHNWx6YXc',
    media: {
      mimeType: 'text/plain',
      body: 'Hello World updated with metadata',
    },
    auth: sampleClient.oAuth2Client,
  });
  console.log(res.data);

  // update example with metadata update
  res = await drive.files.update({
    fileId: '0B-skmV2...',
    requestBody: {
      title: 'Updated title',
    },
    media: {
      mimeType: 'text/plain',
      body: 'Hello World updated with metadata',
    },
    auth: sampleClient.oAuth2Client,
  });
  console.log(res.data);
}

const scopes = [
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.photos',
  'https://www.googleapis.com/auth/drive',
];

sampleClient
  .authenticate(scopes)
  .then(client => runSamples(client))
  .catch(console.error);
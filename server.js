// server.js
const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();

const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'emergencyindex',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("build"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/build/index.html");
});

app.post('/photo', upload.single('photo'), function(req, res, next) {
  // const now = Date.now().toString()
  // s3.upload({
  //   Bucket: 'emergencyindex',
  //   ACL: 'public-read',
  //   ContentType: 'application/json',
  //   Key: `${now}.json`,
  //   Body: JSON.stringify({now: now, zomg: 'd00d'})
  // },function (err, data) {
  // if (err) {
  //   res.send("Error" + err);
  // } if (data) {
  //   res.send(data.Location);
  // }})
  res.send('ok')
});

// listen for requests :D
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

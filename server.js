// server.js
const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const sizeOf = require('image-size');

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
  }),
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|tif|tiff/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const d = sizeOf(file);
    console.log(d.width, d.height);
    const isInvalidSize = (d.width != 1500 && d.width != 2100) || (d.height != 1500 && d.height != 2100)
    if (mimetype && extname && !isInvalidSize) {
      return cb(null, true);
    }
    cb(isInvalidSize ? "Image needs to be 5x7 inches (or 1500x2100 pixels)." : "Error: Photo upload only supports the following filetypes: " + filetypes);
  }
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

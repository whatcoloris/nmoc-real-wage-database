// server.js
const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const sizeOf = require('image-size');
const fs = require('fs');

const app = express();

const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/tmp')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() +'_'+ file.originalname.replace(/[^A-Za-z0-9\.]/g,''))
    }
  }),
  fileFilter: function (req, file, cb) {
    const filetypes = /tif|tiff/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (!mimetype || !extname) {
      req.fileValidationError = "Error: Photo upload only supports .tif or .tiff files!";
      return cb(null, false, new Error(req.fileValidationError));
    }
    return cb(null, true);
  }
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("build"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/build/index.html");
});

app.post('/photo', upload.single('photo'), function(req, res, next) {
  if(req.fileValidationError) {
    res.json({success: false, error: req.fileValidationError});
  } else {
    const d = sizeOf(req.file.path)
    const isInvalidSize = (d.width != 1500 && d.width != 2100) || (d.height != 1500 && d.height != 2100);
    if(isInvalidSize) {
      res.json({success: false, error: "Image needs to be 5x7 (1500x2100 pixels) or 7x5 inches (2100x1500 pixels). Your photo is "+d.width+"x"+d.height});
    } else {
      s3.upload({
        Bucket: 'emergencyindex',
        ACL: 'public-read',
        ContentType: req.file.mimetype,
        Key: `uploads/${req.file.filename}`,
        Body: fs.createReadStream(req.file.path)
      },function (err, data) {
      if (err) {
        res.json({success: false, error: "Error: " + err});
      } if (data) {
        fs.unlinkSync(req.file.path);
        res.json({success: true, data: data.Location});
      }})
    }
  }
});

app.post('/submit', function(req, res, next) {
  const now = Date.now().toString()
  s3.upload({
    Bucket: 'emergencyindex',
    ACL: 'public-read',
    ContentType: 'application/json',
    Key: `${now}.json`,
    Body: JSON.stringify(req.body)
  },function (err, data) {
  if (err) {
    res.send({success: false, error: "Error: " + err});
  } if (data) {
    res.send({success: true, data: 'Thank You!'});
  }})
});

// listen for requests :D
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

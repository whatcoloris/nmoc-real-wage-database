const aws = require('aws-sdk');
const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});


s3.listObjects({
Bucket: 'emergencyindex', 
Prefix: 'uploads/',
MaxKeys: 1000
}, function(err, data) {
 if (err) {
   // an error occurred
   console.log(err, err.stack);
 } else {
   console.log(data);           // successful response
   data.Contents.forEach( item => {
     item.Key
     s3.getObject({
      Bucket: 'emergencyindex', 
      Key: item.Key
     }, function(err, data) {
       if (err) console.log(err, err.stack); // an error occurred
       else     console.log(data);           // successful response
       
     });


   })
 }
});
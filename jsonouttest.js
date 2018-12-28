const aws = require('aws-sdk');
const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

s3.listObjects({Bucket:'emergencyindex'}).
on('success', function handlePage(item) {
  item.data.Contents.forEach( item => {
    if(item.Key.match(/.json/)){
      s3.getObject({
       Bucket: 'emergencyindex', 
       Key: item.Key
      }, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(JSON.parse(data.Body));           // successful response  
      });
    }
  })
  if(item.hasNextPage()) {
    // There's another page; handle it
    item.nextPage().on('success', handlePage).send();
  }
}).on('error', function(err) {
    console.error('o noz error:',err)
}).send();


// s3.listObjects({
// Bucket: 'emergencyindex', 
// Prefix: 'uploads/',
// MaxKeys: 1000
// }, function(err, data) {
//  if (err) {
//    // an error occurred
//    console.log(err, err.stack);
//  } else {
//    console.log(data);           // successful response
//    data.Contents.forEach( item => {
//      item.Key
//      s3.getObject({
//       Bucket: 'emergencyindex', 
//       Key: item.Key
//      }, function(err, data) {
//        if (err) console.log(err, err.stack); // an error occurred
//        else     console.log(data);           // successful response
       
//      });


//    })
//  }
// });
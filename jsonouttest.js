const aws = require('aws-sdk');
const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});
let promises = [];

s3.listObjects({Bucket:'emergencyindex'}).
on('success', function handlePage(item) {
  item.data.Contents.forEach(function(item) {
    if(item.Key.match(/.json/)){
      s3.getObject({
       Bucket: 'emergencyindex', 
       Key: item.Key
      }, function(err, data) {
        promises.push(
          new Promise(function(resolve, reject) {
            if (err){
              console.warn(err, err.stack);
              reject(err);
            } else {
              const project_form = JSON.parse(data.Body);
              // console.log('project_form.data', project_form.data)
              if (project_form.data && project_form.data.length > 0){
                resolve(project_form.data);
              }
            }
          })
        );
      });
    }
  })
  if(item.hasNextPage()) {
    // There's another page; handle it
    item.nextPage().on('success', handlePage).send();
  }
}).on('error', function(err) {
    console.warn('o noz error:',err)
}).on('complete', function() {
  console.log('complete!');
}).send();

Promise.all(promises).then( function(data) {
  setTimeout(function(){ console.log('promises data:', data); }, 1000)
});

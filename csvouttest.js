const aws = require('aws-sdk');
const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});


let keys = [];
  s3.listObjects({Bucket:'emergencyindex', Prefix: 'submissions/'})
  .on('success', function handlePage(item) {
    item.data.Contents.forEach(function(item) {
      if(item.Key.match(/.json/)){
        keys.push(item.Key);
      }
    })
    if(item.hasNextPage()) {
      // another page: handle it
      item.nextPage().on('success', handlePage).send();
    }
  }).on('error', function(err) {
      console.warn('o noz error:',err)
  }).on('complete', function() {
    // console.log('complete! keys:', keys);
    let promises = [];
    keys.forEach( function(k) {
      promises.push(
        new Promise(function(resolve, reject) {
          s3.getObject({
           Bucket: 'emergencyindex', 
           Key: k
          }, function(err, data) {
            if (err){
              console.warn(err, err.stack);
              resolve();
            } else {
              const project_form = JSON.parse(data.Body);
              // console.log('project_form.data', project_form.data)
              if (project_form.data && project_form.data.length > 0){
                resolve(project_form.data);
              }else{
                resolve();
              }
            }
          });
        })
      );
    });

    Promise.all(promises).then( function(data) {
      // console.log('promises data:', data);
      /*
      
      {
        label: 'some label',
        value: 'path.to.something',
        default: 'NULL'
      }
      
      project_form.items.0.value
      */
      const json2csv = require('json2csv').parse;
      const fields = [
        'contact_name',
        'contact_email',
        'contact_postal',
        'contact_phone',
        'title',
        'contributor',
        'collaborators',
        'date_first_performed',
        'times_performed',
        'venue',
        'city',
        'state_country',
        'home',
        'published_contact',
        'links',
        'description',
        'photo_credit',
        'photoUrl',
        'already_submitted',
        'wants_to_get_involved',
        'wants_to_host',
        'validationError'
      ];
      data.project_form.items.map( item => ({label: item.id, value: , default: 'NULL'}) )
      
      
      try {
        const csv = json2csv(data, { fields });
        console.log('CSV:,', csv);
        // res.send(csv);
      } catch (err) {
        console.error('csv err:',err);
        // res.json({error: err});
      }

      
    }).catch( function(err) {
      console.log('caught err', err)
      // res.json({error: err});
    });
    
  }).send();




var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var bucket = 'numo-taggy'; // should this be an Environment Variable?
var s3bucket = new AWS.S3({params: {Bucket: bucket}});

module.exports = function s3_create (record, callback) {
  var type = record._id.split(':')[0];
  var subtype = record._id.split(':')[1].split('.')[0];
  var filepath = type + '/' + subtype + '/' + record._id + '.json';
  // console.log(filepath);
  var params = {
    Key: 'ci/' + filepath,
    Body: JSON.stringify(record, null, 2),
    ContentType: 'application/json',
    ACL: 'public-read'
  };
  s3bucket.upload(params, function (err, data) {
    // console.log(err, data);
    callback(err, data);
  });
};

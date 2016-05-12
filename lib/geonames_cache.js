var AWS = require('aws-sdk');
var AwsHelper = require('aws-lambda-helper');
AWS.config.region = 'eu-west-1';
var s3 = new AWS.S3();

module.exports.set = function set (path, record, callback) {
  var filepath = path + '.json';
  AwsHelper.log.info({ filepath: filepath }, 'Cache set');
  var params = {
    Key: filepath,
    Bucket: process.env.GEONAMES_CACHE,
    Body: JSON.stringify(record, null, 2),
    ContentType: 'application/json',
    ACL: 'public-read'
  };
  s3.upload(params, function (err, data) {
    record.Key = data.Key; // return the original record with S3 Key (Mutation!)
    return callback(err, record);
  });
};

// get from cache
module.exports.get = function get (path, callback) {
  var params = {
    Bucket: process.env.GEONAMES_CACHE, /* required */
    Key: path + '.json'
  };
  s3.getObject(params, function (err, data) {
    if (!err && data.Body) {
      return callback(err, JSON.parse(data.Body));
    } else {
      return callback(err, data);
    }
  });
};

module.exports.remove = function remove (path, callback) {
  var params = {
    Bucket: process.env.GEONAMES_CACHE, /* required */
    Key: path + '.json'
  };
  s3.deleteObject(params, callback);
};

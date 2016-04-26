var geonames = require('./lib/geonames');
var AwsHelper = require('aws-lambda-helper');
var s3_create = require('./lib/s3_create');
/**
 * expects event to
 *
 */
exports.handler = function (event, context) {
  console.log('Received event:', JSON.stringify(event, null, 2)); // debug SNS
  // should we CHECK that the even has a location & lat/lon before lookup?
  if (!event.location || !event.location.lat || !event.location.lon) {
    return context.fail({ message: 'lat & lon must be set on event.location' });
  }
  var lat = event.location.lat;
  var lon = event.location.lon;
  console.log('LAT/LON:', lat, lon);
  geonames.find(lat, lon, function (err, data) {
    AwsHelper.failOnError(err, event, context);
    var geonames_id = data.geonames[0].geonameId;
    geonames.hierarchy(geonames_id, function (err, hierarchy) {
      AwsHelper.failOnError(err, event, context);
      geonames.get_all_geonames_records(hierarchy, (err, map) => {
        AwsHelper.failOnError(err, event, context);
        var geo_tags = geonames.format_hierarchy_as_tags(hierarchy, map);
        console.log(JSON.stringify(geo_tags, null, 2)); // the argument to context.succeed
        // save each geonames record to S3
        var count = 1; // keep track of how many records saved to S3
        geo_tags.forEach(function (tag) {
          s3_create('geo/geonames', tag, function (err, data) {
            console.log(count, err, data);
            if (++count === geo_tags.length) { // only succeed once
              context.succeed(geo_tags);
            }
          });
        });
      });
    });
  });
};

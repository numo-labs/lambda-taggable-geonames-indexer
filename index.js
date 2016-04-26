var geonames = require('./lib/geonames');
var AwsHelper = require('aws-lambda-helper');
var s3_create = require('./lib/s3_create');
/**
 * @param {event} Object - a Taggable Tag with a `location` attribute
 * containing lat & lon values.
 * @returns geo_tags Array of Objects which are the geonames tags.
 */
exports.handler = (event, context) => {
  console.log('Received event:', JSON.stringify(event, null, 2)); // debug SNS
  // should we CHECK that the even has a location & lat/lon before lookup?
  if (!event.location || !event.location.lat || !event.location.lon) {
    return context.fail({ message: 'lat & lon must be set on event.location' });
  }
  var lat = event.location.lat;
  var lon = event.location.lon;
  console.log('LAT/LON:', lat, lon);
  geonames.find(lat, lon, (err, data) => {
    AwsHelper.failOnError(err, event, context);
    var geonames_id = data.geonames[0].geonameId;
    geonames.hierarchy(geonames_id, (err, hierarchy) => {
      AwsHelper.failOnError(err, event, context);
      hierarchy._id = geonames_id; // set the _id for S3 filename
      s3_create('geo/geonames/hierarchy', hierarchy, (err, data) => {
        AwsHelper.failOnError(err, event, context);
      });
      geonames.get_all_geonames_records(hierarchy, (err, map) => {
        AwsHelper.failOnError(err, event, context);
        var geo_tags = geonames.format_hierarchy_as_tags(hierarchy, map);
        console.log(JSON.stringify(geo_tags, null, 2)); // the argument to context.succeed
        // save each geonames record to S3
        var count = 1; // keep track of how many records saved to S3
        geo_tags.forEach((tag) => {
          s3_create('geo/geonames/tags', tag, (err, data) => {
            AwsHelper.failOnError(err, event, context);
            // console.log(count, err, data);
            if (++count === geo_tags.length) { // only succeed once
              context.succeed(geo_tags);
            }
          });
        });
      });
    });
  });
};

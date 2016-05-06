var geonames = require('./lib/geonames');
var AwsHelper = require('aws-lambda-helper');
/**
 * @param {event} Object - a Taggable Tag with a `location` attribute
 * containing lat & lon values.
 * @returns geo_tags Array of Objects which are the geonames tags.
 */
exports.handler = (event, context, callback) => {
  console.log('Received event:', JSON.stringify(event, null, 2)); // debug SNS
  // should we CHECK that the even has a location & lat/lon before lookup?
  if (!event.location || !event.location.lat || !event.location.lon) {
    return callback({ message: 'lat & lon must be set on event.location' });
  }
  var lat = event.location.lat;
  var lon = event.location.lon;
  console.log('LAT/LON:', lat, lon);
  geonames.find(lat, lon, (err, data) => {
    AwsHelper.failOnError(err, event, context);
    var geonames_id = data.geonames[0].geonameId;
    geonames.hierarchy(geonames_id, (err, hierarchy) => {
      AwsHelper.failOnError(err, event, context);
      geonames.get_all_geonames_records(hierarchy, (err, map) => {
        AwsHelper.failOnError(err, event, context);
        var geo_tags = geonames.format_hierarchy_as_tags(hierarchy, map);
        console.log(JSON.stringify(geo_tags)); // the argument to context.succeed
        // context.succeed(geo_tags);
        return callback(err, geo_tags); // see: https://git.io/vwFd3
      });
    });
  });
};

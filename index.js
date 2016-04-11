var geonames = require('./lib/geonames');
var AwsHelper = require('aws-lambda-helper');
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
      context.succeed(hierarchy);
    });
  });
};

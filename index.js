var geonames = require('./lib/geonames');
var AwsHelper = require('aws-lambda-helper');
var util = require('util');

/**
 * @param {event} Object - a Taggable Tag with a `location` attribute
 * containing lat & lon values.
 * @returns geo_tags Array of Objects which are the geonames tags.
 */
exports.handler = (event, context, callback) => {
  AwsHelper.init(context, event);
  AwsHelper.Logger(require('./package.json').name);
  var log = AwsHelper.log;
  log.trace({ event: util.inspect(event) }, 'Received event');

  // should we CHECK that the even has a location & lat/lon before lookup?
  if (!event.location || !event.location.lat || !event.location.lon) {
    var message = 'lat & lon must be set on event.location';
    log.warn(message);
    return callback({ message: message });
  }
  var lat = event.location.lat;
  var lon = event.location.lon;
  log.info({ lat: lat, lng: lon }, 'Lat / Lng');
  geonames.find(lat, lon, (err, data) => {
    /* istanbul ignore if */
    if (err) {
      log.trace({ err: err, data: data },
        'Geonames could not find lat: ' + lat + ' | lon: ' + lon);
      return callback(err);
    }
    // AwsHelper.failOnError(err, event, context);
    var geonames_id = data.geonames[0].geonameId;
    geonames.hierarchy(geonames_id, (err, hierarchy) => {
      // AwsHelper.failOnError(err, event, context);
      /* istanbul ignore if */
      if (err) {
        log.trace({ err: err, data: hierarchy },
          'Geonames could not find lat: ' + lat + ' | lon: ' + lon);
        return callback(err);
      }
      geonames.get_all_geonames_records(hierarchy, (err, map) => {
        // AwsHelper.failOnError(err, event, context);
        /* istanbul ignore if */
        if (err) {
          log.trace({ err: err, data: map },
            'Geonames could not find lat: ' + lat + ' | lon: ' + lon);
          return callback(err);
        }
        var geo_tags = geonames.format_hierarchy_as_tags(hierarchy, map);
        log.info({ geo_tags: util.inspect(geo_tags) });
        return callback(err, geo_tags); // see: https://git.io/vwFd3
      });
    });
  });
};

var geonames_cache = require('./geonames_cache');
var http_request = require('./http_request');
var geonames_username = require('./username');
var assert = require('assert');
var AwsHelper = require('aws-lambda-helper');

// these options are re-used by both methods
var OPTIONS = {
  port: 80,
  method: 'GET',
  host: 'api.geonames.org',
  path: '/'
};
//
function geonames_find_nearby_place_name_by_lat_lng (lat, lng, callback) {
  var start = Date.now();
  lat = 'lat=' + lat.toString().replace(',', '.');
  lng = '&lng=' + lng.toString().replace(',', '.');
  var filepath = 'place/' + lat + lng;
  geonames_cache.get(filepath, function cb (err, data) {
    if (!err && data) {
      AwsHelper.log.info({ filepath: filepath }, 'Cache found');
      return callback(err, data);
    } else {
      var username = '&username=' + geonames_username();
      var query = '&style=full&localCountry=true&cities=15000';
      var options = JSON.parse(JSON.stringify(OPTIONS)); // "Clone"
      options.path = '/findNearbyPlaceNameJSON?' + lat + lng + username + query;
      http_request(options, function (err, data) {
        if (err) {
          AwsHelper.log.error({ err: err }, 'Unable to connect to geonames cache');
        }
        assert(!err);
        AwsHelper.log.info({ url: options.host + options.path, duration: Date.now() - start, duration_unit: 'ms' }, 'Request');
        return geonames_cache.set(filepath, data, callback);
        // return callback(err, data);
      });
    }
  });
}

function geonames_hierarchy (geonames_id, callback) {
  var start = Date.now();
  var filepath = 'hierarchy/' + geonames_id;
  geonames_cache.get(filepath, function (err, data) {
    if (!err && data) {
      AwsHelper.log.info({ filepath: filepath }, 'Cache found');
      return callback(err, data);
    } else {
      var id = 'geonameId=' + geonames_id;
      var username = '&username=' + geonames_username();
      var options = JSON.parse(JSON.stringify(OPTIONS)); // "Clone"
      options.path = '/hierarchyJSON?' + id + username;
      http_request(options, function (err, hierarchy) {
        if (err) {
          AwsHelper.log.error({ err: err }, 'Unable to connect to geonames cache');
        }
        assert(!err);
        AwsHelper.log.info({ url: options.host + options.path, duration: Date.now() - start, duration_unit: 'ms' }, 'Request');
        return geonames_cache.set(filepath, hierarchy, callback);
        // return callback(err, hierarchy);
      });
    }
  });
}

//
function geonames_get (geonames_id, callback) {
  var start = Date.now();
  var filepath = 'place/' + geonames_id;
  geonames_cache.get(filepath, function (err, data) {
    if (!err && data) {
      AwsHelper.log.info({ filepath: filepath }, 'Cache found');
      return callback(err, data);
    } else {
      var id = 'geonameId=' + geonames_id;
      var username = '&username=' + geonames_username();
      var options = JSON.parse(JSON.stringify(OPTIONS)); // "Clone"
      options.path = '/getJSON?' + id + username;
      http_request(options, function cb (err, data) {
        if (err) {
          AwsHelper.log.error({ err: err }, 'Unable to connect to geonames cache');
        }
        assert(!err);
        AwsHelper.log.info({ url: options.host + options.path, duration: Date.now() - start, duration_unit: 'ms' }, 'Request');
        return geonames_cache.set(filepath, data, callback);
      });
    }
  });
}

function get_all_geonames_records_in_hierarchy (hierarchy, callback) {
  var start = Date.now();
  var records_map = {};
  var count = hierarchy.geonames.length;

  hierarchy.geonames.forEach((entry, index) => {
    var id = entry.geonameId;
    geonames_get(id, (err, data) => {
      if (err) {
        AwsHelper.log.error({ err: err }, 'Unable to get geonames');
      }
      // if (err) callback(err); // fail early?
      records_map[id] = data;
      if (--count === 0) {
        AwsHelper.log.info(
          { duration: Date.now() - start,
            duration_unit: 'ms'
          }, 'get_all_geonames_records_in_hierarchy for ' + Object.keys(records_map).length + 'Request');
        return callback(err, records_map);
      }
    });
  });
}

module.exports = {
  find: geonames_find_nearby_place_name_by_lat_lng,
  get: geonames_get,
  hierarchy: geonames_hierarchy,
  alternate_names: require('./format_tags').map_alternate_names,
  get_all_geonames_records: get_all_geonames_records_in_hierarchy,
  format_hierarchy_as_tags: require('./format_tags')
};

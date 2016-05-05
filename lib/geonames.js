var http_request = require('./http_request');
var geonames_username = require('./username');

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
  var username = '&username=' + geonames_username();
  var query = '&style=full&localCountry=true&cities=15000';
  var options = JSON.parse(JSON.stringify(OPTIONS)); // "Clone"
  options.path = '/findNearbyPlaceNameJSON?' + lat + lng + username + query;
  http_request(options, function (err, data) {
    console.log(options.host + options.path, ' request took', Date.now() - start, 'ms');
    return callback(err, data);
  });
}

function geonames_hierarchy (geonames_id, callback) {
  var start = Date.now();
  var id = 'geonameId=' + geonames_id;
  var username = '&username=' + geonames_username();
  var options = JSON.parse(JSON.stringify(OPTIONS)); // "Clone"
  options.path = '/hierarchyJSON?' + id + username;
  http_request(options, function (err, hierarchy) {
    console.log(options.host + options.path, ' request took', Date.now() - start, 'ms');
    return callback(err, hierarchy);
  });
}

//
function geonames_get (geonames_id, callback) {
  var start = Date.now();
  var id = 'geonameId=' + geonames_id;
  var username = '&username=' + geonames_username();
  var options = JSON.parse(JSON.stringify(OPTIONS)); // "Clone"
  options.path = '/getJSON?' + id + username;
  // console.log(options);
  // console.log(' - - - - - - - - - - - - - - - - ');
  http_request(options, function cb (err, data) {
    console.log(options.host + options.path, ' request took', Date.now() - start, 'ms');
    return callback(err, data);
  });
}

function get_all_geonames_records_in_hierarchy (hierarchy, callback) {
  var start = Date.now();
  var records_map = {};
  var count = hierarchy.geonames.length;

  hierarchy.geonames.forEach((entry, index) => {
    var id = entry.geonameId;
    // console.log(index, id);
    geonames_get(id, (err, data) => {
      // if (err) callback(err); // fail early?
      // console.log(err, data.name);
      records_map[id] = data;
      if (--count === 0) {
        console.log('get_all_geonames_records_in_hierarchy for: ' +
          Object.keys(records_map).length + ' (parallel) request took', Date.now() - start, 'ms');
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

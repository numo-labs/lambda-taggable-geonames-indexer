var http_request = require('./http_request');
var geonames_username = require('./username');
// these options are re-used by both methods
var options = {
  port: 80,
  method: 'GET',
  host: 'api.geonames.org',
  path: '/'
};

function geonames_find_nearby_place_name_by_lat_lng (lat, lng, callback) {
  lat = 'lat=' + lat.toString().replace(',', '.');
  lng = '&lng=' + lng.toString().replace(',', '.');
  var username = '&username=' + geonames_username();
  var query = '&style=full&localCountry=true&cities=15000';
  options.path = '/findNearbyPlaceNameJSON?' + lat + lng + username + query;
  // console.log(options);
  http_request(options, function (err, data) {
    return callback(err, data);
  });
}

function geonames_hierarchy (geonames_id, callback) {
  var id = 'geonameId=' + geonames_id;
  var username = '&username=' + geonames_username();
  options.path = '/hierarchyJSON?' + id + username;
  // console.log(options);
  http_request(options, function (err, data) {
    return callback(err, data);
  });
}

// function geonames_hotel_lookup (hotel, callback) {
//   var lat = hotel.Latitude;
//   var lng = hotel.Longitude;
//   geonames_find_nearby_place_name_by_lat_lng(lat, lng, function (err, data) {
//     console.log(err, data);
//   });
// }

module.exports = {
  find: geonames_find_nearby_place_name_by_lat_lng,
  hierarchy: geonames_hierarchy,
  format_hierarchy_as_tags: require('./format_tags')
  // hotel_lookup: geonames_hotel_lookup
};

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
  var latlng = 'lat=' + lat.replace(',', '.') + '&lng=' + lng.replace(',', '.');
  var username = '&username=' + geonames_username();
  var query = '&style=full&localCountry=true&cities=15000';
  options.path = '/findNearbyPlaceNameJSON?' + latlng + username + query;
  // console.log(options);
  http_request(options, function (err, data) {
    return callback(err, data);
  });
}

module.exports = {
  find: geonames_find_nearby_place_name_by_lat_lng
};

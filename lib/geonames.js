var http_request = require('./http_request');

var options = {
  port: 80,
  method: 'GET',
  host: 'api.geonames.org',
  path: '/'
};

function geonames_find (lat, lng, callback) {
  var latlng = 'lat=' + lat + '&lng=' + lng;
  var username = '&username=' + 'nelsonic';
  var query = '&style=full&localCountry=true&cities=15000'
  options.path = '/findNearbyPlaceNameJSON?' + latlng + username + query;
  // console.log(options);
  http_request(options, function (err, data) {
    return callback(err, data);
  });
};

module.exports = geonames_find;

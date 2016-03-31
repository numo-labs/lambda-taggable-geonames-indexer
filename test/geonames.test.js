var assert = require('assert');
var geo = require('../lib/geonames');

var lat = '45,67960'.replace(',', '.');
var lng = '13,40070'.replace(',', '.');

geo(lat, lng, function(err, data) {
  console.log(err, data);
  console.log(data.geonames[0].geonameId);
  assert(data.geonames[0].geonameId === 3343565);
});

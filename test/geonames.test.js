var assert = require('assert');
var geonames = require('../lib/geonames');
var fixtures = require('./hotels_fixture.json');

describe('Geonames find nearby place by Lat/Long', function () {
  it('geonames.find', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var lat = fixtures[0].Latitude;
    var lng = fixtures[0].Longitude;
    geonames.find(lat, lng, function (err, data) {
      // console.log(err, data);
      assert(!err, 'No erros');
      console.log('geonameId:', data.geonames[0].geonameId);
      assert(data.geonames[0].geonameId === 3343565);
      done();
    });
  });
});

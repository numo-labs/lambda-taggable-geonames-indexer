var assert = require('assert');
var geonames = require('../lib/geonames');
var fixtures = require('./hotels_fixture.json');

describe('Geonames API', function () {
  it('geonames.find (find_nearby_place_name_by_lat_lng)', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var lat = fixtures[0].Latitude;
    var lng = fixtures[0].Longitude;
    geonames.find(lat, lng, function (err, data) {
      // console.log(err, data);
      assert(!err, 'No erros');
      // console.log('geonameId:', data.geonames[0].geonameId);
      assert(data.geonames[0].geonameId === 3343565);
      done();
    });
  });

  it('geonames.hierarchy (hierarchyJSON)', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var lat = fixtures[1].Latitude;
    var lng = fixtures[1].Longitude;
    geonames.find(lat, lng, function (err, data) {
      assert(!err, 'No erros');
      // console.log(err, data);
      var geonames_id = data.geonames[0].geonameId;
      geonames.hierary(geonames_id, function (err, data) {
        assert(!err, 'No erros');
        // console.log(err, data);
        assert(data.geonames[0].name === 'Earth', 'The Hotel is in Earth');
        done();
      });
    });
  });
});

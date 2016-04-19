var assert = require('assert');
var geonames = require('../lib/geonames');
var fixtures = require('./fixtures/master_hotels_fixture.json');

describe('Geonames API', function () {
  it('geonames.find (find_nearby_place_name_by_lat_lng)', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var lat = fixtures[0].Latitude;
    var lng = fixtures[0].Longitude;
    geonames.find(lat, lng, function (err, data) {
      // console.log(err, data);
      assert(!err, 'No erros');
      console.log('geonameId:', data.geonames);
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
      geonames.hierarchy(geonames_id, function (err, data) {
        assert(!err, 'No erros');
        // console.log(err, data);
        assert(data.geonames[0].name === 'Earth', 'The Hotel is in Earth');
        done();
      });
    });
  });

  it('geonames.get (getJSON)', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var geonames_id = 2643743;
    geonames.get(geonames_id, function (err, data) {
      assert(!err, 'No erros');
      // console.log(err, data);
      assert(data.wikipediaURL === 'en.wikipedia.org/wiki/London');
      done();
    });
  });

  it('geonames.get (getJSON)', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var geonames_id = 2643743;
    geonames.get(geonames_id, function (err, data) {
      assert(!err, 'No erros');
      assert(data.wikipediaURL === 'en.wikipedia.org/wiki/London');
      done();
    });
  });

  it('geonames.alternate_names (get > alternate_names)', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var geonames_id = 2643743;
    geonames.get(geonames_id, function (err, data) {
      assert(!err, 'No erros');
      // console.log(err, data);
      var alt_names_map = geonames.alternate_names(data);
      // console.log(alt_names_map['fi']);
      assert(alt_names_map['fi'] === 'Lontoo');
      assert(alt_names_map['en'] === 'The City');
      done();
    });
  });
});

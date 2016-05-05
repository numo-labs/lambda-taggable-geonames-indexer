require('env2')('.env');
var assert = require('assert');
var geonames = require('../lib/geonames');
var fixtures = require('./fixtures/master_hotels_fixture.json');
var hierarchy_fixture = require('./fixtures/geonames_hierarchy_fixture.json');

describe('Geonames API', function () {
  it('geonames.find (find_nearby_place_name_by_lat_lng)', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var lat = fixtures[0].Latitude;
    var lng = fixtures[0].Longitude;
    geonames.find(lat, lng, function (err, data) {
      // console.log(err, data);
      assert(!err, 'ERROR:' + JSON.stringify(err));
      // console.log('geonameId:', data.geonames);
      assert(data.geonames[0].geonameId === 3343565);
      done();
    });
  });

  it('geonames.hierarchy (hierarchyJSON)', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var lat = fixtures[1].Latitude;
    var lng = fixtures[1].Longitude;
    geonames.find(lat, lng, function (err, data) {
      console.log('25', err);
      // assert(!err, 'ERROR:'+ JSON.stringify(err));
      // console.log(err, data);
      var geonames_id = data.geonames[0].geonameId;
      geonames.hierarchy(geonames_id, function (err, data) {
        console.log('30', err);
        // assert(!err, 'ERROR:'+ JSON.stringify(err));
        console.log('Earth:', data.geonames[0]);
        assert(data.geonames[0].name === 'Earth', 'The Hotel is in Earth');
        done();
      });
    });
  });

  it('geonames.get (getJSON)', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var geonames_id = 2643743;
    geonames.get(geonames_id, function (err, data) {
      console.log('43', err);
      // assert(!err, 'ERROR:'+ JSON.stringify(err));
      console.log('wikipediaURL:', data.wikipediaURL);
      assert(data.wikipediaURL === 'en.wikipedia.org/wiki/London');
      done();
    });
  });

  it('geonames.get (getJSON)', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    var geonames_id = 2643743;
    geonames.get(geonames_id, function (err, data) {
      console.log('55', err);
      // assert(!err, 'ERROR:'+ JSON.stringify(err));
      assert(data.wikipediaURL === 'en.wikipedia.org/wiki/London');
      done();
    });
  });

  it('geonames.alternate_names (get > alternate_names)', function (done) {
    var geonames_id = 2643743;
    geonames.get(geonames_id, function (err, data) {
      console.log('65', err);
      // assert(!err, 'ERROR:'+ JSON.stringify(err));
      var alt_names_map = geonames.alternate_names(data);
      var languages = ['da', 'de', 'en', 'es', 'fi', 'fr', 'nl', 'no', 'ru', 'sv', 'zh'];
      var city_list = ['London', 'London', 'The City', 'Londres', 'Lontoo', 'Londres', 'Londen', 'London', 'Лондон', 'London', '伦敦'];
      languages.forEach((lang, i) => {
        assert(alt_names_map[lang] === city_list[i]);
      });
      assert(alt_names_map['en'] === 'The City');
      done();
    });
  });

  it('geonames.get_all_geonames_records_in_hierarchy', function (done) {
    geonames.get_all_geonames_records(hierarchy_fixture, (err, map) => {
      console.log('80', err);
      // assert(!err, 'ERROR:'+ JSON.stringify(err));
      hierarchy_fixture.geonames.forEach((entry) => {
        var g = map[entry.geonameId];
        assert(g.name, entry.name);
      });
      done();
    });
  });
});

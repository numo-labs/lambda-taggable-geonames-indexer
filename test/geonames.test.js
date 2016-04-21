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
      assert(!err, 'ERROR:', err);
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
      assert(!err, 'ERROR:', err);
      // console.log(err, data);
      var geonames_id = data.geonames[0].geonameId;
      geonames.hierarchy(geonames_id, function (err, data) {
        assert(!err, 'ERROR:', err);
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
    var geonames_id = 2643743;
    geonames.get(geonames_id, function (err, data) {
      assert(!err, 'No erros');
      // console.log(err, data);
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
    // the fixtures have commas in the Lat/Long values ...
    // console.log(hierarchy_fixture);
    geonames.get_all_geonames_records(hierarchy_fixture, (err, map) => {
      assert(!err);
      hierarchy_fixture.geonames.forEach((entry) => {
        var g = map[entry.geonameId];
        assert(g.name, entry.name);
      });
      // console.log(err, map);
      // var filename = require('path').resolve(__dirname + '/fixtures/geonames_all_records_fixture.json')
      // console.log(filename);
      // require('fs').writeFileSync(filename, JSON.stringify(map, null, 2));
      done();
    });
  });
});

var format_as_tags = require('../lib/format_tags');
var assert = require('assert');
var hierarchy_fixture = require('./fixtures/geonames_hierarchy_fixture.json');
var geonames_records_map = require('./fixtures/geonames_all_records_fixture.json');
describe('format geonames hierarchy as array of tag objects', function () {
  it('format_tags.js', function (done) {
    var geo_tags = format_as_tags(hierarchy_fixture, geonames_records_map);
    var earth = {
      'node': 'geo:geonames.6295630',
      'edge': 'LOCATED_IN',
      'displayName': 'Earth',
      'source': 'geonames',
      'inherited': false,
      'active': true
    };
    // console.log(tags);
    // console.log(JSON.stringify(geo_tags[2], null, 2)); // the argument to context.succeed
    assert.equal(geo_tags.length, hierarchy_fixture.geonames.length, '6 Tags');
    assert.deepEqual(geo_tags[1].tags[0], earth);
    assert.equal(geo_tags[1].markets['dk']['da'].values[0], 'Nordamerika');
    done();
  });

  it('invoke format_geonames_tags without geonames_records_map', function (done) {
    var geo_tags = format_as_tags(hierarchy_fixture, {});
    console.log(JSON.stringify(geo_tags[1], null, 2)); // the argument to context.succeed
    assert.ok(!geo_tags[0].markets);
    done();
  });

  it('invoke map_alternate_names without alternateNames', function (done) {
    var res = format_as_tags.map_alternate_names({});
    assert.deepEqual(res, {});
    done();
  });
});

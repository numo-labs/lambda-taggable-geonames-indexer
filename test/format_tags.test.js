var format_as_tags = require('../lib/format_tags');
var assert = require('assert');
var hierarchy_fixture = require('./fixtures/geonames_hierarchy_fixture.json');

describe('format geonames hierarchy as array of tag objects', function () {
  it('format_tags.js', function (done) {
    var geo_tags = format_as_tags(hierarchy_fixture);
    var expected = {
      'tagId': 'geo:geonames.6295630',
      'displayName': 'Earth',
      'source': 'geonames',
      'inherited': false,
      'active': true
    };
    // console.log(tags);
    console.log(JSON.stringify(geo_tags, null, 2)); // the argument to context.succeed
    assert.equal(geo_tags.length, hierarchy_fixture.geonames.length, '6 Tags');
    assert.deepEqual(geo_tags[5].tags[4], expected);
    done();
  });
});

require('env2')('.env');
var assert = require('assert');
var geonames = require('../lib/geonames');
var geonames_cache = require('../lib/geonames_cache');

var geonames_id = 2643743;
var filepath = 'test/place/' + geonames_id;

describe('geonames_cache', function () {
  it('save (getJSON)', function (done) {
    geonames.get(geonames_id, function (err, record) {
      if(err) console.log(err);
      assert(record.wikipediaURL === 'en.wikipedia.org/wiki/London');
      geonames_cache.save(filepath, record, function (err, data) {
      	if(err) console.log(err);
      	assert.equal(data.Key, filepath + '.json');
      	done();
      })
    });
  });

  it('get (from cache)', function (done) {
  	geonames_cache.get(filepath, function (err, data) {
  		if(err) console.log('S3 get ERROR:', err);
  		assert.equal(data.name, 'London');
  		done();
  	});
  });

  it('get cache miss (not found)', function (done) {
  	geonames_cache.get('non-existent', function (err, data) {
  		assert.equal(err.statusCode, 404)
  		done();
  	});
  });

  it('remove (from cache)', function (done) {
  	geonames_cache.remove(filepath, function (err, data) {
  		if(err) console.log('S3 remove ERROR:', err);
  		assert(!err);
  		done();
  	});
  });
});
require('env2')('.env');
var assert = require('assert');
var geonames = require('../lib/geonames');
var geonames_cache = require('../lib/geonames_cache');

var geonames_id = 2643743;
var filepath = 'test/place/' + geonames_id;

describe('geonames_cache', function () {
  it('set (getJSON)', function (done) {
    geonames.get(geonames_id, function (err, record) {
      if(err) console.log(err);
      assert(record.wikipediaURL === 'en.wikipedia.org/wiki/London');
      geonames_cache.set(filepath, record, function (err, data) {
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

// delete 3 records so index.test.js exercises all branches (Cache Miss)
// place/lat=35.04850&lng=-90.02710
// hierarchy/4645760
// place/6295630

describe('remove 3 cached records to exercise Cache Miss branches', function () {
	it('removes 2 places and a hierarchy', function (done) {
		var files = [
			'place/lat=35.04850&lng=-90.02710',
			'hierarchy/4645760',
			'place/6295630'
		];
		var count = 0;
		files.forEach(function (filepath) {
			geonames_cache.remove(filepath, function (err) {
				assert(!err);
				geonames_cache.get(filepath, function (err, data) {
		  		assert.equal(err.statusCode, 404);
		  		if(++count === files.length) {
		  			done();
		  		}
		  	});
			})
		});
	});
});


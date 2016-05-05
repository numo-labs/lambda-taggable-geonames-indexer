var assert = require('assert');
require('decache')('../lib/username'); // "un-require" the module
var username = require('../lib/username');

describe('Get Random Geonames Username from List', function () {
  it('username > get_random_geonames_username', function (done) {
    for (var i = 0; i < 10; i++) {
      var u = username();
      // console.log(u);
      assert(process.env.GEONAMES_USERNAMES.indexOf(u) > -1);
    }
    done();
  });
});

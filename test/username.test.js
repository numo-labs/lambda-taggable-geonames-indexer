var assert = require('assert');
require('decache')('../lib/username'); // "un-require" the module
var username = require('../lib/username');
var GEONAMES_USERNAMES = process.env.GEONAMES_USERNAMES; // Save for later
console.log(GEONAMES_USERNAMES);
process.env.GEONAMES_USERNAMES = 'user1, user2, user3, user4, user5, user6';

describe('Get Random Geonames Username from List', function () {
  it('username > get_random_geonames_username', function (done) {
    // the fixtures have commas in the Lat/Long values ...
    for (var i = 0; i < 10; i++) {
      var u = username();
      // console.log(u);
      assert(process.env.GEONAMES_USERNAMES.indexOf(u) > -1);
    }
    process.env.GEONAMES_USERNAMES = GEONAMES_USERNAMES; // restore to valid
    done();
  });
});

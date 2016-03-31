var http_request = require('../lib/http_request');
var assert = require('assert');

describe('http_request', function () {
  it('make GET request to invalid url (error branch check)', function (done) {
    var options = {
      'host': 'example.jo',
      'path': '/thiswillfail'
    };
    http_request(options, function (e, res) {
      assert.equal(e.code, 'ENOTFOUND');
      done();
    });
  });
});

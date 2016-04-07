var helper = require('../lib/helper');
var assert = require('assert');

describe('helper.error', function () {
  it('call helper.error with an error message', function (done) {
    var err_msg = 'Herro, isa me you rooking for?';
    var CONTEXT = {
      fail: function () {
        // console.log(arguments);
        assert(arguments[0] === err_msg);
        done();
      }
    };
    helper.error(err_msg, {}, CONTEXT);
  });
});

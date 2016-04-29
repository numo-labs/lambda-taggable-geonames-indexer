var handler = require('../index').handler;
var assert = require('assert');
var fixtures = require('./fixtures/master_hotels_fixture.json');
var master = fixtures[5];

var earth = {
  'node': 'geo:geonames.6295630',
  'edge': 'LOCATED_IN',
  'displayName': 'Earth',
  'source': 'geonames',
  'inherited': false,
  'active': true
};

var hotel_tag = {
  _id: 'hotel:mhid.' + master.MID,
  displayName: master.Name,
  location: {
    lat: master.Latitude.toString().replace(',', '.'),
    lon: master.Longitude.toString().replace(',', '.')
  },
  tags: []
};
// console.log(JSON.stringify(hotel_tag, null, 2));

var CONTEXT = {
  functionName: 'LambdaTest',
  functionVersion: '1',
  invokedFunctionArn: 'arn:aws:lambda:eu-west-1:655240711487:function:LambdaTest:$LATEST',
  fail: function () {
    console.log(' - - - - - - - -> FAIL:', arguments);
  }
};

describe('index.handler.test.js > Get Geonames Hierarchy for Hotel by Lat/Long', function () {
  it('invoke the lambda function handler', function (done) {
    CONTEXT.succeed = function () {
      // console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');
      // console.log(JSON.stringify(arguments, null, 2)); // the argument to context.succeed
      var geo_tags = arguments[0];
      assert.deepEqual(geo_tags[1].tags[0], earth);
      // assert(arguments[0] === 'Earth');
      done();
    };
    var EVENT = hotel_tag;
    handler(EVENT, CONTEXT);
  });

  it('invoke lambda handler with bad hotel (no lat/lon)', function (done) {
    var bad_hotel_tag = {
      _id: 'hotel:mhid.' + 'badHotel',
      displayName: 'No Lat Long Values!',
      location: {
        lat: false,
        lon: null
      },
      tags: []
    };

    CONTEXT.fail = function () {
      // console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');
      console.log(arguments); // the argument to context.succeed
      assert(arguments[0].message === 'lat & lon must be set on event.location');
      done();
    };
    var EVENT = bad_hotel_tag;
    handler(EVENT, CONTEXT);
  });
});

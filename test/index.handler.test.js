var handler = require('../index').handler;
var assert = require('assert');
var fixtures = require('./master_hotels_fixture.json');
var master = fixtures[0];

var hotel_tag = {
  _id: 'hotel:mhid.' + master.MID,
  displayName: master.Name,
  location: {
    lat: master.Latitude.toString().replace(',', '.'),
    lon: master.Longitude.toString().replace(',', '.')
  },
  tags: []
};

console.log(JSON.stringify(hotel_tag, null, 2));

var CONTEXT = {
  functionName: 'LambdaTest',
  functionVersion: '1',
  invokedFunctionArn: 'arn:aws:lambda:eu-west-1:655240711487:function:LambdaTest:$LATEST'
};

describe('Get Geonames Hierarchy for Hotel by Lat/Long', function () {
  it('invoke the lambda function handler', function (done) {
    CONTEXT.succeed = function () {
      console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');
      console.log(arguments); // the argument to context.succeed
      assert(arguments[0].geonames[0].name === 'Earth');
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
      console.log(' - - - - - - - - - - - - - - - - - - - - - - - - ');
      console.log(arguments); // the argument to context.succeed
      assert(arguments[0].message === 'lat & lon must be set on event.location');
      done();
    };
    var EVENT = bad_hotel_tag;
    handler(EVENT, CONTEXT);
  });
});

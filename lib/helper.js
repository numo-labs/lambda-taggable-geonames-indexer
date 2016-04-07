// see: https://github.com/numo-labs/aws-lambda-helper/issues/25
// will move if proposal is accepted
var helper = {};

helper.error = function (err, event, context) {
  if (err) {
    return context.fail(err); // halt processing ?
  } else {
    return; // no error so continue processing;
  }
};

module.exports = helper;

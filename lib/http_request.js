/**
 * simple_http_request is a bare-bones http request using node.js core http
 * see: https://nodejs.org/api/http.html#http_http_request_options_callback
 * the NPM request module is 3.6 Megabytes and offers v. little benefit ...
 * This code achieves the same in less than 1kb. less code = faster response.
 * @param {Object} options - the standard http options (host, path, query, etc)
 * @param {Function} callback - a standard callback with error & response args
 * response is a JSON Object unless there is an error.
 */
module.exports = function simple_http_request (options, callback) {
  require('https').request(options, function (res) {
    // console.log(options);
    res.setEncoding('utf8');
    var resStr = '';
    res.on('data', function (chunk) {
      resStr += chunk;
    }).on('end', function () {
      return callback(null, JSON.parse(resStr)); // return response as object
    });
  }).on('error', function (e) {
    return callback(e);
  }).end(); // end the request
};

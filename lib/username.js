/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * from: http://stackoverflow.com/a/1527820/1148249
 * is it random? https://github.com/nelsonic/learn-javascript/issues/21
 */
function get_random_int (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var USERNAMES; // reduce lookup/split op time
/**
 * get_username expects there to be a environment variable set with the
 * a string containing one or more geonames usernames
 * @param {String} process.env.GEONAMES_USERNAMES
 * @returns {String} ONE username from the list (pseudo-random)
 * see: https://github.com/numo-labs/lambda-taggable-geonames-indexer/issues/5
 */
function get_random_geonames_username () {
  USERNAMES = !USERNAMES ? process.env.GEONAMES_USERNAMES.split(',').filter(Boolean) : USERNAMES;
  return USERNAMES[get_random_int(0, USERNAMES.length - 1)].trim();
}

module.exports = get_random_geonames_username;

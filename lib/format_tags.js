// see: http://www.metamodpro.com/browser-language-codes
var languages = ['da', 'de', 'en', 'es', 'fi', 'fr', 'nl', 'no', 'ru', 'sv', 'zh'];
var markets = ['dk', 'de', 'gb', 'es', 'fi', 'fr', 'nl', 'no', 'ru', 'sv', 'cn'];
var s3_create = require('./s3_create');
var assert = require('assert');

/**
 * The Taggable system requires records to be in a specific format
 * @param {Object} hierarchy - the object containing an array of objects
 * @returns {Array} geonames_records_map - the array of taggable tag objects
 */
module.exports = function format_geonames_tags (hierarchy, geonames_records_map) {
  var geotags = [];
  for (var i = 0; i < hierarchy.geonames.length; i++) {
    var g = hierarchy.geonames[i];
    var geonames_tag = {
      _id: 'geo:geonames.' + g.geonameId,
      displayName: g.name,
      location: {
        lat: g.lat,
        lon: g.lng
      },
      tags: [],
      markets: {}
    };
    // parent tags
    if (i > 0) { // earth does not have a parent in Geonames hierarchy
      geonames_tag.tags.push(parent_geo_tag(hierarchy.geonames[i - 1]));
    }
    if (geonames_records_map && Object.keys(geonames_records_map).length > 0) {
      var geonames_json = geonames_records_map[g.geonameId];
      var alt_names_map = map_alternate_names(geonames_json);

      languages.forEach(function (lang, index) {
        var market = markets[index];
        geonames_tag.markets[market] = {};
        if (alt_names_map[lang]) { // only push a metadata entry if lang exists
          geonames_tag.markets[market][lang] = {
            label: alt_names_map[lang][0],
            values: [alt_names_map[lang]]
          };
        }
      });
    }
    // if there are no Alternate Names we default to g.name for search
    languages.forEach(function (lang, index) {
      var market = markets[index];
      if (!geonames_tag.markets[market]) {
        geonames_tag.markets[market] = {};
      }
      if (!geonames_tag.markets[market][lang]) {
        geonames_tag.markets[market][lang] = {
          label: g.name,
          values: [g.name]
        };
      }
    }); // https://github.com/numo-labs/lambda-taggable-geonames-indexer/issues/22

    // save the geonames_tag to S3 asynchronously (fail on error!)
    s3_create(geonames_tag, (e, data) => { assert(!e); });
    geotags.push(geonames_tag);
  }
  return geotags;
};

function map_alternate_names (json) {
  // console.log(json.alternateNames);
  if (!json.alternateNames) {
    return {};
  }
  return json.alternateNames.reduce((map, item) => {
    map[item.lang] = item.name;
    return map;
  }, {});
}

module.exports.map_alternate_names = map_alternate_names;

// geonames tags can have "parent" tags which are other geonames tags
// see readme for example
function parent_geo_tag (parent) {
  return { // the tag we add to other tags
    node: 'geo:geonames.' + parent.geonameId,
    edge: 'LOCATED_IN',
    displayName: parent.name,
    source: 'geonames',
    active: true
  };
}

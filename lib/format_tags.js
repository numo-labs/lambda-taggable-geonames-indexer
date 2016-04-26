var languages = ['da', 'de', 'en', 'es', 'fi', 'fr', 'nl', 'no', 'ru', 'sv', 'zh'];

/**
 * The Taggable system requires records to be in a specific format
 * @param {Object} hierarchy - the object containing an array of objects
 * @returns {Array} geo_tags - the array of taggable tag objects
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
      metadata: []
    };
    // parent tags
    if (i > 0) { // earth does not have a parent in Geonames hierarchy
      geonames_tag.tags.push(parent_geo_tag(hierarchy.geonames[i - 1]));
    }
    if (geonames_records_map && Object.keys(geonames_records_map).length > 0) {
      var geonames_json = geonames_records_map[g.geonameId];
      var alt_names_map = map_alternate_names(geonames_json);
      languages.forEach(function (lang) {
        if (alt_names_map[lang]) { // only push a metadata entry if lang exists
          geonames_tag.metadata.push({
            key: 'label:' + lang,
            values: [alt_names_map[lang]]
          });
          geonames_tag.metadata.push({
            key: 'search:' + lang,
            values: [alt_names_map[lang]]
          });
        }
      });
    }
    geotags.push(geonames_tag);
  }
  return geotags;
};

function map_alternate_names (json) {
  // console.log(json.alternateNames);
  if (!json.alternateNames) {
    return {};
  }
  return json.alternateNames.reduce(function (map, item) {
    map[item.lang] = item.name;
    return map;
  }, {});
}

module.exports.map_alternate_names = map_alternate_names;

// geonames tags can have "parent" tags which are other geonames tags
// see readme for example
function parent_geo_tag (parent) {
  return { // the tag we add to other tags
    tagId: 'geo:geonames.' + parent.geonameId,
    displayName: parent.name,
    source: 'geonames',
    inherited: false,
    active: true
  };
}

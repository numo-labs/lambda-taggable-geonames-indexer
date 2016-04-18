/**
 * The Taggable system requires records to be in a specific format
 * @param {Object} hierarchy - the object containing an array of objects
 * @returns {Array} geo_tags - the array of taggable tag objects
 */
module.exports = function format_geonames_tags (hierarchy) {
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
      tags: []
    };
    // parent tags
    if (i > 0) { // earth does not have a parent in Geonames hierarchy
      for (var j = i - 1; j > -1; j--) { // don't tag something with its' self
      // console.log(j, hierarchy.geonames[j])
        geonames_tag.tags.push(parent_geo_tag(hierarchy.geonames[j]));
      } // this for loop attaches all parents in the geo tag hierarchy to the child
    }
    geotags.push(geonames_tag);
  }
  return geotags;
};

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

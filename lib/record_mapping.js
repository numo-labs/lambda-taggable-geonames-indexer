/**
 * The Taggable system requires records to be in a specific format
 * @param {Object} record - the record you need to map to a Taggable Tag.
 * @param {Object} type - the type of record we are creating
 */
// function map_record_to_taggable (record, type) {
//   return {
//     _id: 'geo:geonames'+record
//   }
// }

// sample data: https://git.io/vVC1Q
/*
{
   "_id": '',
   displayName: 'foo-display-name',
   location: {
     lat: '0',
     lon: '0'
   },
   tags: [
     {
       tagId: 'geography:geonames.123',
       source: 'tag:source.user.12234',
       inherited: false,
       active: true
     },
     {
       tagId: 'geography:geonames.125',
       source: 'tag:source.user.12235',
       inherited: true,
       active: false
     }
   ],
   metadata: [
     {
       key: 'label:en',
       values: ['Hotel ABC']
     },
     {
       key: 'search:en',
       values: ['Hotel ABC']
     }
   ]
 }
*/

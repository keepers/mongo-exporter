const mongoexport = require('./mongoexport')
const mongodump = require('./mongodump')

// mongoexport({
//   key: 'lkm',
//   collection: 'patients',
//   fields: '_id,countryId,firstName,lastName,age,gender,medicineType,educationLevel,ethnicity,civilStatus,createdBy'
// }, (a, b, c) => console.log(a, b, c))

mongodump({
  key: 'lkm'
}, (a, b, c) => console.log(a, b, c))
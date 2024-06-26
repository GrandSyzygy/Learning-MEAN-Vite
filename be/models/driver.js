// requires
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define sub-document
const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema
});

// associate the schema with mongoose
const Driver = mongoose.model('driver', DriverSchema);

// export the model
module.exports = Driver;

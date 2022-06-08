/////////////
// requires
/////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/////////////////////////
// define sub-documents
/////////////////////////
// For type "Point"
// the "coordinates" member is a single position
const PointSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' }
});

// For type "LineString"
// the "coordinates" member is an array of two or more positions
const LineStringSchema = new Schema({
  type: { type: String, default: 'LineString' },
  coordinates: { type: [[Number]], index: '2dsphere' }
});

// For type "Polygon"
// the "coordinates" member is an array of linear ring coordinate arrays.
// The first element represents the exterior ring.
// Any subsequent elemnts represent interieor rings (or holes).
const PolygonSchema = new Schema({
  type: { type: String, default: 'Polygon' },
  coordinates: { type: [[Number]], index: '2dsphere' }
});

// For type "MultiPoint"
// the "coordinates" member is an array of positions
const MultiPointSchema = new Schema({
  type: { type: String, default: 'MultiPoint' },
  coordinates: { type: [PointSchema], index: '2dsphere' }
});

// For type "MultiLineString"
// the "coordinates" member is an array of LineString coordinate arrays
const MultiLineStringSchema = new Schema({
  type: { type: String, default: 'MultiLineString' },
  coordinates: { type: [LineStringSchema] }
});

// For type "MultiPolygon"
// the "coordinates" member is an array of Polygon coordinate arrays
const MultiPolygonSchema = new Schema({
  type: { type: String, default: 'MultiPolygon' },
  coordinates: { type: [PolygonSchema] }
});

// For type "Feature"
// represents a spatially bounded thing
const FeatureSchema = new Schema({
  type: { type: String, default: 'Feature' },
  geometry: {},
  properties: {}
});

// For type "FeatureCollection"
// the "features" member is an array of features
const FeatureCollectionSchema = new Schema({
  type: { type: String, default: 'FeatureCollection' },
  features: [FeatureSchema]
});

// For type "GeometryCollections"
// the "geometries" member is an array of Geometry objects
const GeometryCollectionSchema = new Schema({
  type: { type: String, default: 'GeometryCollection' },
  geometries: []
});

// associate the schemas with mongoose
const Feature = mongoose.model('feature', FeatureSchema);
const FeatureCollection = mongoose.model('featurecollection', FeatureCollectionSchema);
const GeometryCollection = mongoose.model('geometrycollection', GeometryCollectionSchema);
const Point = mongoose.model('point', PointSchema);
const LineString = mongoose.model('linestring', LineStringSchema);
const Polygon = mongoose.model('polygon', PolygonSchema);
const MultiPoint = mongoose.model('multipoint', MultiPointSchema);
const MultiLineString = mongoose.model('multilinestring', MultiLineStringSchema);
const MultiPolygon = mongoose.model('multipolygon', MultiPolygonSchema);

// export the model
module.exports = Feature;
module.exports = FeatureCollection;
module.exports = GeometryCollection;
module.exports = Point;
module.exports = LineString;
module.exports = Polygon;
module.exports = MultiPoint;
module.exports = MultiLineString;
module.exports = MultiPolygon;

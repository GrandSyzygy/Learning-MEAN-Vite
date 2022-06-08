// TODO: Create tests for this schema
// TODO: Set up indexing for GeoQuery
// TODO: Refactor to use RFC 7946 GeoJSON format
/////////////
// requires
/////////////
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GeoJSON = require('./geojson');

/////////////////////////
// define sub-documents
/////////////////////////
// Schema for Regulation model
const RegulationSchema = new Schema({
  // String that contains the type of regulation
  // Ex: "No Parking"
  Description: {
    type: String,
    default: 'Add a description for the regulation',
    required: true
  },
  // Boolean flag to note if it is holiday specific
  isHoliday: {
    type: Boolean,
    default: false,
    required: true
  },
  // Object containing permit specific data
  PermitInfo: {
    // Boolean flag if a permit is required to park
    isPermitRequired: {
      type: Boolean,
      default: false
    },
    // String that denotes the type of permit required
    // Ex: "Disabled Parking"
    PermitType: {
      type: String,
      default: 'Generic'
    }
  },
  // Array to represent the days of the weeks, toggle if active or not
  // Ex: [Mon, Tues, Wed, Thu, Fri, Sat, Sun]
  //     [true, false, true, true, false, true, false]
  EffectiveDays: {
    type: [Boolean],
    required: true
  },
  // Array of Start and End time pairs. Ex: [[Start, End], [Start, End]]
  // ISO 8601 format. Ex: Year-Month-Day T Hour:Minute:Second UTC offset
  //                      2021-10-05T15:42:09-05:00
  EffectiveHours: {
    type: [[String]],
    required: true
  }
});

/////////////////////////
// define main document
/////////////////////////
// Schema for the Post model
const PostSchema = new Schema({
  // LineString of coordinate pairs this post effects
  // Ex: post A -> (midpoints) -> post B
  // Format: [[Post_A_Long, Post_A_Lat], [Post_B_Long, Post_B_Lat]]
  AreaOfEffect: {
    type: {
      type: String,
      default: 'LineString'
    },
    coordinates: {
      type: [[Number]],
      index: '2dsphere'
    }
  },
  // Array of Regulation documents 
  // Ex: 
  // [
  //   {
  //     Description: "No Parking",
  //     isHoliday: false,
  //     PermitInfo: { true, "Disabled Parking" }
  //     EffectiveDays: [true, false, true, true, false, true, false]
  //     EffectiveHours: ["2021-10-05T15:42:09-05:00", "2021-10-05T22:00:00-05:00"]
  //   }
  // ]
  Regulations: [RegulationSchema]
});

// associate the schema with mongoose
const Post = mongoose.model('post', PostSchema);

// export the model
module.exports = Post;

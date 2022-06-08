// TODO: NEED TO COMPLETE, USE DRIVERS_CONTROLLER FOR GUIDANCE
// TODO: CREATE A NEW FEATURE
// TODO: RETRIEVE A FEATURE BASED ON $GEONEAR
// TODO: DELETE A FEATURE
// TODO: EDIT A FEATURE
// import the model
const Feature = require('../models/geojson');

// define and export an object
module.exports = {
  // request handlers
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  // create a new feature
  create(req, res, next) {

  }
};

// import the model
const Driver = require('../models/driver');

// define and export an object
module.exports = {
  // request handlers
  greeting(req, res) {
    res.send({ hi: 'there' });
  },

  // locate a driver near a point
  index(req, res, next){
    // capture the lng, lat from the query string
    const { lng, lat } = req.query;
    const point = {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };

    // query the collection using geoNear
    Driver.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [-80.0, 25.0] },//point,
          spherical: true,
          maxDistance: 20000,
          distanceField: 'dist.calculated'
        }
      }])
      .then((drivers) => {
        res.send(drivers);
      })
      .catch(next);
  },

  // create a new driver
  create(req, res, next) {
    // get reference to req.body property
    const driverProps = req.body;

    // create a new driver based on the properties
    Driver.create(driverProps)
      // return the new driver back to the requester
      .then(driver => res.send(driver))
      // call the next function to move onto the next middelware in the chain
      .catch(next);
  },

  // update a driver
  edit(req, res, next) {
    // get reference to the ID passed in
    const driverID = req.params.id;

    // get reference to the properties
    const driverProps = req.body;

    // search the DB using the passed in ID
    Driver.findByIdAndUpdate({ _id: driverID }, driverProps)
      // find the Driver that was updated
      .then(() => Driver.findById({ _id: driverID }))
      // return the Driver back to whoever made the request
      .then(driver => res.send(driver))
      // error handling
      .catch(next);
  },

  delete(req, res, next) {
    // get reference to the ID passed in
    const driverID = req.params.id;

    // search the DB using the ID
    Driver.findByIdAndRemove({ _id: driverID })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};

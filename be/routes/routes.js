// TODO: Update the routes to handle our new model
// imports
const DriverController = require('../controllers/drivers_controller');
const FeatureController = require('../controllers/features_controller');

// exporting a function
module.exports = (app) => {
  //******************
  // router handlers
  //******************
  ////////
  // GET
  ////////
  // Watch for incoming requests of method GET
  // to the route http://localhost:3050/YParkThere
  app.get('/YPT', FeatureController.greeting);//DriverController.greeting);

  /////////
  // POST
  /////////
  app.post('/YPT/drivers', DriverController.create);

  ////////
  // PUT
  ////////
  app.put('/YPT/drivers/:id', DriverController.edit);

  ///////////
  // DELETE
  ///////////
  app.delete('/YPT/drivers/:id', DriverController.delete);

  /////////
  // GET
  /////////
  app.get('/YPT/drivers', DriverController.index);
};

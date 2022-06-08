// imports
const express = require('express');

// routes in this instances is a function
const routes = require('./routes/routes');

// parses the req.body partions during requests into
// a complete req.body for us to use
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// handles incoming HTTP requests
const app = express();

mongoose.Promise = global.Promise;
// if running in live environment
if(process.env.NODE_ENV !== 'test') {
  // connect to the MongoDB database
  mongoose.connect('mongodb://localhost/YParkThere', { useNewUrlParser: true });
}

// wire up middleware to our app
app.use(bodyParser.json());

// call the routes function with the app object
routes(app);

app.use((err, req, res, next) => {
  // return the error object with the approiate error status
  res.status(422).send({ error: err.message });
});

// export the app so it can be used
module.exports = app;

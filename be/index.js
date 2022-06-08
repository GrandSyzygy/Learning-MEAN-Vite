// imports
const app = require('./app');

// listen for incoming requests
app.listen(3050, () => {
  console.log('Running on port 3050');
});

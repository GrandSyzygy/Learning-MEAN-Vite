// requires
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const {response} = require('express');

// models
const Driver = mongoose.model('driver');

// describe our test
describe('Drivers controller', () => {
  it('Post to /YPT/drivers creates a new driver', (done) => {
    Driver.count().then(count => {
      request(app)
        .post('/YPT/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
        });
      });
    });
    done();
  });

  it('PUT to /YPT/drivers/id edits an existing driver', done => {
    // create a temp Driver
    const driver = new Driver({ email: 't@t.com', driving: false });

    // save the driver to our DB
    driver.save().then(() => {
      // make put request to our application
      request(app)
        .put(`/YPT/drivers/${driver._id}`)
        // data we want to send with the request
        .send({ driving: true })
        .end(() => {
          // Pull the driver out of the DB to check
          Driver.findOne({ email: 't@t.com' })
            .then(driver => {
              // make our check
              assert(driver.driving === true);
              done();
            });
        });
      });
  });
 
  it('DELETE to /YPT/drivers/id can delete a driver', done => {
    // create a temp Driver
    const driver = new Driver({ email: 'test@test.com' });

    // save the driver to our DB
    driver.save().then(() => {
      request(app)
        .delete(`/YPT/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 'test@test.com' })
            .then((driver) => {
              assert(driver === null);
              done();
            });
        });
    });
  });

  it('GET to /YPT/drivers find drivers in a location', done => {
    // create temp Driver
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
    });

    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
    });

    // save the drivers
    Promise.all([ seattleDriver.save(), miamiDriver.save() ])
      .then(() => {
        // query
        request(app)
          .get('/YPT/drivers?lng=-80&lat=25')
          .end((err, response) => {
            assert(response.body.length === 1);
            assert(response.body[0].email === 'miami@test.com');
            done();
          });
      });
  });
});

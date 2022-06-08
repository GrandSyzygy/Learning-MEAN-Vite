// imports/requires
const assert = require('assert');
const {response} = require('express');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
  it('handles a GET request to /YPT', (done) => {
    request(app)
      .get('/YPT')
      .end((err, response) => {
        assert(response.body.hi === 'there');
        done();
      });
  });
});

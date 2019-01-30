'use strict';

const request = require('supertest');
const should = require('should');
const config = require('config');

const baseUrl = config.get('app.url');
const _ = require('lodash');

const errCdoes = require('../../lib/error');

describe('/backend/home', function () {
  it('default', function (done) {
    request(baseUrl)
      .get('/backend/home')
      .expect(200)
      .end((err, result) => {
        should.not.exists(err);
        result.body.code.should.equal(errCdoes.SUCCESS);

        done();
      });
  });
});
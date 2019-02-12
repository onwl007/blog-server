'use strict';

const BaseService = require('./base');
const { MomentModel } = require('../model');

class MomentService extends BaseService {
  constructor () {
    super(MomentModel);
  }
}

module.exports = new MomentService();

'use strict';

const BaseService = require('./base');
const { OptionModel } = require('../model');

class OptionService extends BaseService {
  constructor () {
    super(OptionModel);
  }
}

module.exports = new OptionService();

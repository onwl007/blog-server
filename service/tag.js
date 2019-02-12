'use strict';

const BaseService = require('./base');
const { TagModel } = require('../model');

class TagService extends BaseService {
  constructor () {
    super(TagModel);
  }
}

module.exports = new TagService();

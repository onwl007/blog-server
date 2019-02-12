'use strict';

const BaseService = require('./base');
const { CategoryModel } = require('../model');

class CategoryService extends BaseService {
  constructor () {
    super(CategoryModel);
  }
}

module.exports = new CategoryService();

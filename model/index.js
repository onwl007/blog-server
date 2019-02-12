'use strict';

const mongoose = require('mongoose');
const scehmas = require('./schema');
const utils = require('../lib/utils.js');
const models = {};

Object.keys(scehmas).forEach(key => {
  const schema = getSchema(scehmas[key]);
  if (schema) {
    models[`${utils.firstUpperCase(key)}Model`] = mongoose.model(utils.firstUpperCase(key), key);
  }
});

// 构建 schema
function getSchema (schema) {
  if (!schema) {
    return null;
  }

  schema.set('versionKey', false);
  schema.set('toObject', { getters: true });
  schema.set('toJSON', { getters: true, virtuals: false });
  schema.pre('findOneAndUpdate', updateHook);
  return schema;
}

// 更新 updatedAt
function updateHook (next) {
  this.findOneAndUpdate({}, { updatedAt: Date.now() });
  next();
}

module.exports = models;
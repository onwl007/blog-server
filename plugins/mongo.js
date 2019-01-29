'use strict';

const config = require('config');
const mongoose = require('mongoose');
let debug = require('debug')('MongoDB');
const mongo = config.get('mongo');

/**
 * 没有mongoose.Promise=global.Promise会出现错误，
 * 意思就是mongoose自带的promise过期了,
 * 然后需要v8引擎的promise
 */
mongoose.Promise = global.Promise;

exports.connect = () => {
  mongoose.connect(mongo.uri, mongo.options).then(() => {
    debug('连接成功');
  }, err => {
    debug('连接失败: ', mongo.uri, err.message);
  });
};
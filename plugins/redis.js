'use strict';

const redis = require('redis');
const config = require('config');
const debug = require('debug')('Redis');

let client = null;
let connected = false;

exports.connect = () => {
  if (client) {
    return debug('已连接');
  }

  client = redis.createClient(config.get('redis'));
  client.on('error', err => {
    debug('连接失败: ', err.message);
    connected = false;
  });
  client.on('connect', () => {
    debug('连接成功');
    connected = true;
  });
  client.on('reconnecting', () => {
    debug('正在重连中...');
  });
};
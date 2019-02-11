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
    console.error('Redis startup faild ' + err.message);
    debug('连接失败: ', err.message);
    connected = false;
  });
  client.on('connect', () => {
    debug('连接成功');
    console.log('Redis is ready now!');
    connected = true;
  });
  client.on('reconnecting', () => {
    console.log('Redis reconnecting...');
    debug('正在重连中...');
  });
};
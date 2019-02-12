'use strict';

const BaseService = require('./base');
const { NotificationModel } = require('../model');
const debug = require('debug');
const enums = require('../lib/enum');
const { typeMap, categoryMap } = enums.Notification;

class NotificationService extends BaseService {
  constructor () {
    super(NotificationModel);
  }

  // 生成站内消息
  gen (model) {
    return this.newAndSave(model).then(res => {
      if (res && res.length) {
        console.log('通知生成成功，', `类型[${getKeyByValue(typeMap, model.type)}]，分类[${getKeyByValue(categoryMap, model.category)}]，ID[${res[0]._id}]`);
        debug('通知生成成功，', `类型[${getKeyByValue(typeMap, model.type)}]，分类[${getKeyByValue(categoryMap, model.category)}]，ID[${res[0]._id}]`);
      }
      return res;
    }).catch(err => {
      console.error('通知生成失败，错误：', err.message);
      debug.error('通知生成失败，错误：', err.message);
      return null;
    });
  }
}

function getKeyByValue (obj, val) {
  return Object.keys(obj).find(key => val === obj[key]);
}

module.exports = new NotificationService();

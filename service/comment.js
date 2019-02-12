'use strict';

const BaseService = require('./base');
const { CommentModel } = require('../model');
const notificationService = require('./notification');
const enums = require('../lib/enum');
const { typeMap, categoryMap } = enums.Notification;

class CommentService extends BaseService {
  constructor () {
    super(CommentModel);
  }

  // 生成通知的创建
  createAndNotify (model) {
    return this.newAndSave(model).then(res => {
      if (res && res.length) {
        notificationService.gen({
          type: typeMap.COMMENT,
          category: categoryMap[model.forward ? 'COMMENT_REPLY' : 'COMMENT_COMMENT'],
          comment: res[0]._id
        });
      }
      return res[0];
    });
  }

  likeAndNotify (id, like, user) {
    return this.updateById(id, {
      $inc: {
        ups: like ? 1 : -1
      }
    }).exec().then(res => {
      if (res) {
        const payload = {
          type: typeMap.LIKE,
          category: categoryMap[like ? 'LIKE_COMMENT' : 'UNLIKE_COMMENT'],
          comment: id
        };
        if (user) {
          payload.user = typeof user === 'string' ? user : user._id;
        }
        notificationService.gen(payload);
      }
      return res;
    });
  }
}

module.exports = new CommentService();

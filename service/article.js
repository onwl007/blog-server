'use strict';

const BaseService = require('./base');
const { ArticleModel } = require('../model');
const notificationService = require('./notification');
const enums = require('../lib/enum');
const { typeMap, categoryMap } = enums.Notification;

class ArticleService extends BaseService {
  constructor () {
    super (ArticleModel);
  }

  likeAndNotify (id, like, user) {
    return this.updateById(id, {
      $inc: {
        'meta.ups': like ? 1 : -1
      }
    }).exec().then(result => {
      if (result) {
        const payload = {
          type: typeMap.LIKE,
          category: categoryMap[like ? 'LIKE_ARTICLE' : 'UNLIKE_ARTICLE'],
          article: id
        };
        if (user) {
          payload.user = typeof user === 'string' ? user : user._id;
        }
        notificationService.gen(payload);
      }
      return result;
    });
  }
}

module.exports = new ArticleService();
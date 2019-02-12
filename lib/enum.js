'use strict';

// 站内通知
const Notification = {
  typeMap: {
    GENERAL: 0,
    COMMENT: 1,
    LIKE: 2,
    USER: 3,
  },
  categoryMap: {
    // type === 0，系统通知
    MUTE_USER: 'mute-user', // 用户禁言
    // type === 1，评论通知
    COMMENT_COMMENT: 'comment-comment', // 评论（非回复）
    COMMENT_REPLY: 'comment-reply',	// 评论回复
    COMMENT_UPDATE: 'comment-update', // 评论更新
    // type === 2，点赞通知
    LIKE_ARTICLE: 'like-article', // 文章点赞
    UNLIKE_ARTICLE: 'unlike-article', // 文章取消点赞
    LIKE_COMMENT: 'like-comment', // 评论点赞
    UNLIKE_COMMENT: 'unlike-comment', // 评论取消点赞
    // type === 3, 用户操作通知
    USER_CREATE: 'user-create', // 用户创建
    USER_UPDATE: 'user-update' // 用户更新
  },
};

module.exports = {
  Notification,
};
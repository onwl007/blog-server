'use strict';

const mongoosePaginate = require('mongoose-paginate');
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  // 文章标题
  title: { type: String, require: true },
  // 文章关键字
  keywords: [{ type: String }],
  // 文章摘要
  description: { type: String, default: '' },
  // 文章原始 markdown 内容
  content: { type: String, require: true, validate: /\S+/ },
  // markdown 渲染后的 html 内容
  renderedContent: { type: String, require: true, validate: /\S+/ },
  // 分类
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  // 标签
  tag: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  // 缩略图
  thumb: { type: String, validate: /.+?\.(jpg|jpeg|gif|bmp|png)/ },
  // 文章状态
  state: { type: Number, default: 0 },
  // 永久链接
  permalink: { type: String, validate: /\S+/ },
  // 创建日期
  createdAt: { type: Date, default: Date.now },
  // 更新日期
  updatedAt: { type: Date, default: Date.now },
  // 发布日期
  publishedAt: { type: Date, default: Date.now },
  // 文章元数据 (浏览量、喜欢数、评论数)
  meta: {
    pvs: { type: Number, default: 0, validate: /^\d*$/ },
    ups: { type: Number, default: 0, validate: /^\d*$/ },
    comments: { type: Number, default: 0, validate: /^\d*$/ },
  }
});

articleSchema.plugin(mongoosePaginate);

module.exports = articleSchema;
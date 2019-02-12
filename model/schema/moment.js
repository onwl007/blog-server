'use strict';

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const momentSchema = new mongoose.Schema({
  content: { type: String, required: true, validate: /\S+/ },
  location: { type: Object, required: true },
  state: { type: Number, default: 1 }, // 状态 0 未发布 | 1 发布
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

momentSchema.plugin(mongoosePaginate);

module.exports = momentSchema;

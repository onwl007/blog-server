'use strict';

const mongoose = require('mongoose');
const Validator = require('koa-bouncer').Validator;

Validator.addMethod('notEmpty', function (tip) {
  this.isString(`${this.key}参数格式错误，期望格式：String`);
  if(this.val().length === 0) {
    this.throwError(tip || `${this.key}参数不能为空`);
  }
  return this;
});

Validator.addMethod('isObjectId', function (tip) {
  const val = this.val();
  if (val !== undefined) {
    this.toString();
    if (!mongoose.Types.ObjectId.isValid(val)) {
      this.throwError(tip || `${this.key}参数格式错误，期望格式：ObjectId`);
    }
  }
  return this;
});

Validator.addMethod('isObjectIdArray', function (tip) {
  const val = this.val();
  if (val !==undefined) {
    this.isArray();
    val.forEach(data => {
      if(!mongoose.Types.ObjectId.isValid(data)) {
        this.throwError(tip || `${this.key}参数格式错误，期望格式：[ObjectId]`);
      }
    });
  }
  return this;
});

module.exports = Validator;
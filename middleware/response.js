'use strict';

const errCodes = require('../lib/error');

module.exports = async (ctx, next) => {
  ctx.success = (data, msg) => {
    ctx.body = {
      code: errCodes.SUCCESS,
      msg: msg || '',
      data: data || null
    };
  };

  ctx.fail = (code, msg, data) => {
    ctx.body = {
      code: code || errCodes.INTERNAL_ERR,
      msg: msg || '',
      data: data || null
    };
  };

  await next();
};
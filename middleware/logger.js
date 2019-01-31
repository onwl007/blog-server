'use strict';

const log4js = require('log4js');
const _ =require('lodash');
const config = require('config');

log4js.configure({
  appenders: [
    {
      type: 'console',
      category: 'console'
    },
    {
      type: 'dateFile',
      filename: 'logs/blog-server.log',
      pattern: '_yyyy-MM-dd',
      alwaysIncludePattern: false,
      category: 'dateFileLog'
    }
  ],
  replaceConsole: true,
});

let logger = log4js.getLogger(_.isEqual(config.get('app.env'), 'dev') ? 'console' : 'dateFileLog');

module.exports = async (ctx, next) => {
  try {
    await next();
    logger.info(`${ctx.method} ${ctx.url} ==success: ${JSON.stringify(ctx.body)}`);
  } catch (err) {
    // 完善 http 状态码错误码形式，日志形式
    let code = err.status || 500;
    logger.error(`${ctx.method} ${ctx.url} ==fail: ${JSON.stringify(ctx.body)}`);
  }
};
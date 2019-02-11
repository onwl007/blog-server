'use strict';

const router = require('koa-router')();
const backend = require('./backend');
const frontend = require('./frontend');

module.exports = app => {
  router.get('/', async (ctx, next) => {
    ctx.body = {
      name: 'onwl007',
      version: '',
      author: '',
      github: 'https://github.com/onwl007',
      site: 'http://www.onwl007.com',
      poweredBy: ['Koa2', 'MongoDB', 'Nginx']
    };
  });

  router.use('/backend', backend.routes(), backend.allowedMethods());
  router.use(frontend.routes(), frontend.allowedMethods());

  router.all('*', (ctx, next) => {
    ctx.fail(404, `${ctx.path} 不支持 ${ctx.method} 请求类型`);
  });

  app.use(router.routes(), router.allowedMethods());
};
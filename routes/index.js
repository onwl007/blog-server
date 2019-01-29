'use strict';

const router = require('koa-router')();
const backend = require('./backend');

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

  app.use(router.routes(), router.allowedMethods());
};
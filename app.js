const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
// const logger = require('koa-logger');
// const log4js = require('log4js');
// const logger = require('./lib/logger').logger;
const router = require('./routes');
const { mongo, redis } = require('./plugins');
const middlewares = require('./middleware');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
// app.use(logger());
app.use(middlewares.response);
app.use(middlewares.logger);

// logger
// app.use(async (ctx, next) => {
//   const start = new Date();
//   await next();
//   const ms = new Date() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// });
// app.use(log4js.connectLogger());

// routes
router(app);

// mongodb connect
mongo.connect();

// redis connect
redis.connect();

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;

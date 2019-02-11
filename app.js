const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const bouncer = require('koa-bouncer');
const router = require('./routes');
const { mongo, redis, validation } = require('./plugins');
const middlewares = require('./middleware');

// load custom validations
bouncer.Validator = validation;

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
app.use(middlewares.response);
app.use(middlewares.logger);

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

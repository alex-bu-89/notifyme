const config = require('config');
const logger = require('../config/logger');

const Koa = require('koa');

// for passport support
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const app = new Koa();

exports.app = app;
exports.passport = passport;

// trust proxy
app.proxy = true;

// sessions
app.keys = [config.get('secret')];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

// error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.response.body = {
      message: err.message,
      error: err,
    };
  }
});

require('./routes');

logger.info(`${config.get('name')} is now listening on port ${config.get('port')}`);
app.listen(config.get('port'));

process.on('SIGINT', () => {
  process.exit();
});

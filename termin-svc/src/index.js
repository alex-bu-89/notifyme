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

// the auth model for passport support
// require('./models/auth');

// trust proxy
app.proxy = true;

// sessions
app.keys = [config.get('site.secret')];
app.use(session(app));

// body parser
app.use(bodyParser());

// authentication
app.use(passport.initialize());
app.use(passport.session());

// Error handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    await ctx.render('error', {
      message: err.message,
      error: {},
    });
  }
});

require('./routes');

logger.info(`${config.get('site.name')} is now listening on port ${config.get('site.port')}`);
app.listen(config.get('site.port'));

process.on('SIGINT', () => {
  process.exit();
});

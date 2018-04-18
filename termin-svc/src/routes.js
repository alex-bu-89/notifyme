const { app } = require('./index.js');
const { passport } = require('./index.js');
const Router = require('koa-router');

const router = new Router();

const main = require('./controllers/main.js');

// routes
router.get('/', main.index);

// you can add as many strategies as you want
router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    successRedirect: '/account',
    failureRedirect: '/',
  }),
);

app.use(router.routes());
app.use(router.allowedMethods());

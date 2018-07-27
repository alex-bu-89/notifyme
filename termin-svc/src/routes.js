const { app } = require('./index');
const Router = require('koa-router');
const main = require('./controllers/main');
const appointment = require('./controllers/appointment');

const router = new Router({
  prefix: '/api/v1',
});

// routes
router.get('/', main.index);
router.get('/appointment', appointment.get);

app.use(router.routes());
app.use(router.allowedMethods());

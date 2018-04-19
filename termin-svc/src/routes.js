const { app } = require('./index');
const Router = require('koa-router');

const router = new Router();

const main = require('./controllers/main');
const appointment = require('./controllers/appointment');

// routes
router.get('/', main.index);
router.get('/appointment', appointment.get);


app.use(router.routes());
app.use(router.allowedMethods());

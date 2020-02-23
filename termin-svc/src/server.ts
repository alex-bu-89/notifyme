import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

// Import controllers (route handlers)
import apiRouter from './router';

// Import controllers (route handlers)
import * as indexController from './controllers/indexController';
import * as healthController from './controllers/healthController';

// Import services
import errorHandler from './middlewares/errorHandler';

// Import middlelayers
import logger from './utils/logger';

// Init express
const app = express();
const router = express.Router();

// Mongodb connection
// mongoose.connect(
// 	`${config.get('db.host')}/${config.get('db.name')}`,
// 	{ useNewUrlParser: true, useUnifiedTopology: true }
// );

// mongoose.connection.on('error', (error: any) => {
// 	logger.error(error);
// });

// Express configuration
app.set('port', config.get('port'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
router.get('/', indexController.index);
router.get('/health', healthController.index);
router.use('/v1', apiRouter);

app.use('/', router);
app.use(errorHandler);

export default app;

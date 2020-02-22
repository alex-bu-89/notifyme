import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(__dirname, '../.env') });

import config from 'config';
import logger from './utils/logger';
import app from './server';

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
	logger.info(`Server is running at http://localhost:${app.get('port')} in ${app.get('env')} mode.`);
	logger.debug(`Config is ${JSON.stringify(config.util.toObject())}`);
});

export default server;

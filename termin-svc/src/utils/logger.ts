import log4js from 'log4js';
import config from 'config';

const options: log4js.Configuration = {
	appenders: {
		console: {
			type: 'stdout',
			layout: {
				type: 'pattern',
				pattern: '%[[%d] %p (%z)%] %m'
			}
		}
	},
	categories: {
		default: {
			appenders: ['console'],
			level: config.get('logger.level') as string
		}
	}
};

log4js.configure(options);
const logger = log4js.getLogger();

export default logger;

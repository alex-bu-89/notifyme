const winston = require('winston');

const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

if (process.env.NODE_ENV === 'production') {
  logger.level = 'info';
}

module.exports = logger;

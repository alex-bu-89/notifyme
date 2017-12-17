const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize, simple } = format;

const myFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

module.exports = createLogger({
  level: 'debug',
  transports: [new transports.Console()],
  format: combine(
    colorize({ all: true }),
    simple(),
    timestamp(),
    myFormat
  ),
});

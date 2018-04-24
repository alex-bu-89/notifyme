const config = require('config');
const webdriverio = require('webdriverio');
const logger = require('../../config/logger');

const options = { desiredCapabilities: { browserName: 'chrome' } };
// const options = { desiredCapabilities: { browserName: 'phantomjs' } };
const client = webdriverio.remote(options);

module.exports.get = async (ctx) => {
  logger.info('Start webdriverio');

  client
    .init()
    .url(config.get('startUrl'))
    .getHTML('body')
    .then((html) => {
      logger.info(html);

      ctx.response.body = {
        status: 200,
        data: 'working',
      };
    })
    .catch((error) => {
      logger.error(error);
      throw error;
    });
};

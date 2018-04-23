const config = require('config');
const phantom = require('phantom');
const logger = require('../../config/logger');

module.exports.get = async (ctx) => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', (requestData) => {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open(config.get('startUrl'));
  const button = await page.evaluate(() => {
    return document.getElementById('btnTerminBuchen').textContent;
  });

  // const content = await page.property('content');

  await instance.exit();

  ctx.response.body = {
    status: 200,
    data: JSON.stringify(button),
  };
};

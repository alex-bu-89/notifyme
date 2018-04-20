const logger = require('../../config/logger');
const phantom = require('phantom');

module.exports.get = async (ctx) => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', (requestData) => {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open('https://stackoverflow.com/');
  const content = await page.property('content');

  await instance.exit();

  ctx.response.body = {
    status: 200,
    data: JSON.stringify(content),
  };
};

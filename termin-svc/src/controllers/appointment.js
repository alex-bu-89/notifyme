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
  // const button = await page.evaluate(function() {
  //   return document.getElementById('foo').innerHTML;
  // }).then(function(html){
  //   console.log(html);
  // });

  // const content = await page.property('content');

  // console.log('------>', content);

  await instance.exit();

  ctx.response.body = {
    status: 200,
    data: 'working',
  };
};

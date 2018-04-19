const logger = require('../../config/logger');

module.exports.get = async (ctx) => {
  ctx.response.body = {
    status: 200,
    data: { hello: 'world' },
  };
};

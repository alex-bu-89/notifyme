'use strict';

const config = require('../../config/default.json');

module.exports.index = async(ctx) => {
	ctx.response.body = 'index';
};

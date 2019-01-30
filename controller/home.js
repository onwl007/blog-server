'use strict';

const errCodes = require('../lib/error');

function  homeIndex (ctx) {
  ctx.success('sds', 'homeindex');
}

module.exports = {
  homeIndex,
};
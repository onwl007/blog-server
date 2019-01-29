'use strict';

const router = require('koa-router')();
const homeController = require('../controller/home');

// home
router.get('/home', homeController.homeIndex);

module.exports = router;
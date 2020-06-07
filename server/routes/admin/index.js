const router = require('koa-router')();
const system = require('./system');

router.use('/system', system.routes(), system.allowedMethods());

module.exports = router
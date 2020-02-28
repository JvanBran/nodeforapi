const router = require('koa-router')();
const users = require('./users');
router.prefix('/api/v1/')
router.use('/users', users.routes(), users.allowedMethods());

module.exports = router

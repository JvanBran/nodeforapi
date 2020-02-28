const router = require('koa-router')();
const users = require('./users');
const login = require('./login');
// router.prefix('/api/v1/')
router.use('/login', login.routes(), login.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

module.exports = router

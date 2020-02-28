const router = require('koa-router')();

const login = require('./login');
const users = require('./users')
// router.prefix('/api/v1/')
router.use('/login', login.routes(), login.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());

module.exports = router

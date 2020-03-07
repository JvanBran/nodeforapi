const router = require('koa-router')();

const login = require('./login');
const users = require('./users');
const updata = require('./updata');
// router.prefix('/api/v1/')
router.use('/login', login.routes(), login.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/updata', updata.routes(), updata.allowedMethods());

module.exports = router

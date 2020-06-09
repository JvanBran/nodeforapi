const router = require('koa-router')()
const users = require('./users');
const updata = require('./updata');
const user_info = require('./user_info')

router.use('/users', users.routes(), users.allowedMethods());
router.use('/updata', updata.routes(), updata.allowedMethods());
router.use('/user',user_info.routes(), user_info.allowedMethods())

module.exports = router

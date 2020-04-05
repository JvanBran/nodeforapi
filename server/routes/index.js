const router = require('koa-router')();

const publicInterface = require('./public/index')
const appInterface = require('./app/index')
const adminInterface = require('./admin/index')
/**
 * GET 获取资源
 * POST 创建一个新的资源
 * PUT 用来整体更新一个资源，必须包含完整的资源信息
 * PATCH 则是部分更新。仅更新提供的字段
 * DELETE 删除资源
 */
// router.prefix('/api/v1')
//  公共接口
router.use('/public', publicInterface.routes(), publicInterface.allowedMethods());
//  前端接口
router.use('/app', appInterface.routes(), appInterface.allowedMethods());
//  后台接口
router.use('/admin', adminInterface.routes(), adminInterface.allowedMethods());
module.exports = router

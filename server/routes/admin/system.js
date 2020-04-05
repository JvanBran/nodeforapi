const router = require('koa-router')()
import { createMeunNav , getMeunNav } from '../../app/controller'
const datalize = require('datalize');
const field = datalize.field;

//注册菜单
router.post('/createMeunNav',datalize([
  field('parent_id').required(), //父级id
  field('title').required(), //标题
  field('path').required(), //路由地址
  field('name').required(), //路由名称
  field('component').required(), //栏目文件地址 模版或者页面import
  field('keepAlive').required(), //是否需要缓存状态
  field('show').required(), //是否在列表显示
]), async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await createMeunNav(reqBody);
});
//注册菜单
router.get('/getMeunNav', async (ctx, next) => {
    let reqBody = ctx.request.body;
    ctx.body = await getMeunNav(reqBody);
  });
module.exports = router

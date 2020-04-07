const router = require('koa-router')()
import { 
  getMeunNav , 
  createMeunNav,
  updateMeunNav, 

  getUserMeunNav,
  getUserRole,
  createUserRole,
  updateUserRole
} from '../../app/controller'
const datalize = require('datalize');
const field = datalize.field;

router
// 获取所有菜单
.get('/meunlist',async(ctx,next)=>{
  let reqBody = ctx.request.body;
  ctx.body = await getMeunNav(reqBody);
})
// 新建菜单
.post('/meunlist',datalize([
  field('parent_id').required(), //父级id
  field('title').required(), //标题
  field('path').required(), //路由路径
  field('name').required(), //栏目路由名
  field('component').required(), //栏目文件地址 模版或者页面import
  field('icon').required(), //栏目图标 只有组标题才显示
  field('keepAlive').required(),//是否需要缓存状态
  field('permission').required(), //权限名
  field('isShow').required(), //是否显示    前端则是删除
  field('show').required(), //是否在列表上显示
  field('target').required(), //打开方式
]),async(ctx,next)=>{
  let reqBody = ctx.request.body;
  ctx.body = await createMeunNav(reqBody);
})
// 更新菜单
.patch('/meunlist',datalize([
  field('_id').required() //菜单对应id
]),async(ctx,next)=>{
  let reqBody = ctx.request.body;
  ctx.body = await updateMeunNav(reqBody);
})
// 获取用户菜单（根据角色）
.get('/usermeunlist',async(ctx,next)=>{
  let reqBody = ctx.request.body;
  ctx.body = await getUserMeunNav(reqBody);
})
// 获取所有角色
.get('/userrole',async(ctx,next)=>{
  let reqBody = ctx.request.body;
  ctx.body = await getUserRole(reqBody);
})
// 创建角色
.post('/userrole',datalize([
  field('role_name').required(), //角色名
  field('describe').required(), //角色描述
  field('status').required(), //角色状态
  field('creatorId').required(), //创建用户
]),async(ctx,next)=>{
  let reqBody = ctx.request.body;
  ctx.body = await createUserRole(reqBody);
})
// 修改角色
.patch('/userrole',async(ctx,next)=>{
  let reqBody = ctx.request.body;
  ctx.body = await updateUserRole(reqBody);
})
module.exports = router

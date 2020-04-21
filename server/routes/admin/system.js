const router = require('koa-router')()
import { 
  getMeunNav , 
  createMeunNav,
  updateMeunNav, 

  getUserMeunNav,
  getRole,
  createRole,
  updateRole
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
  field('permission').required(), //权限名
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
  let reqBody = Object.assign(ctx.request.body,{"id":ctx.params.id?ctx.params.id:ctx.state.JwtToken._id,"user_type":ctx.state.JwtToken.user_type,"user_role":ctx.state.JwtToken.user_role});
  ctx.body = await getUserMeunNav(reqBody);
})
// 获取所有角色
.get('/userrole',async(ctx,next)=>{
  let reqBody = ctx.request.body;
  ctx.body = await getRole(reqBody);
})
// 创建角色
.post('/userrole',datalize([
  field('role_name').required(), //角色名
  field('describe').required(), //角色描述
  field('status').required(), //角色状态
  field('creatorId').required(), //创建用户
]),async(ctx,next)=>{
  let reqBody = ctx.request.body;
  ctx.body = await createRole(reqBody);
})
// 修改角色
.patch('/userrole',async(ctx,next)=>{
  let reqBody = ctx.request.body;
  ctx.body = await updateRole(reqBody);
})
module.exports = router

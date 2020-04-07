const router = require('koa-router')();
import { createUser,userLogin,getUserInfo,getUserList,updateUserInfo,updateUserPassword } from '../../app/controller'
const datalize = require('datalize');
const field = datalize.field;
router
//注册
.post('/register',datalize([
    field('password').required(), //密码
    field('customer_email').email(), //邮箱
    field('mobile_phone').required().phone(), //手机号码
  ]),async (ctx, next) => {
    let reqBody = ctx.request.body;
    ctx.body = await createUser(reqBody);
})
//登录
.post('/signin',datalize([
    field('password').required(), //密码
    field('customer_email').email(), //邮箱
    field('mobile_phone').phone(), //手机号码
  ]),async (ctx, next) => {
    let reqBody = Object.assign(ctx.request.body,{'login_ip':ctx.request.ip});
    ctx.body = await userLogin(reqBody);
})
// 获取用户信息（包含权限信息）
.get('/userInfo/:id',async (ctx, next) => {
    let reqBody = Object.assign(ctx.request.body,{"id":ctx.params.id?ctx.params.id:ctx.state.JwtToken._id});
    ctx.body = await getUserInfo(reqBody);
})
// 获取用户列表
.get('/userInfo',datalize([
    field('pageNo').required(), //页码
    field('pageSize').required(), //条数
  ]),async (ctx, next) => {
    let reqBody = Object.assign(ctx.request.body);
    ctx.body = await getUserList(reqBody);
  })
// 修改用户信息
.patch('/userInfo/:id',async (ctx, next) => {
    let reqBody = Object.assign(ctx.request.body,{"id":ctx.params.id?ctx.params.id:ctx.state.JwtToken._id});
    ctx.body = await updateUserInfo(reqBody)
})
// 修改用户密码
.patch('/userPassword/:id',datalize([
    field('password').required(), //密码
    field('customer_email').email(), //邮箱
    field('mobile_phone').phone(), //手机号码
  ]),async (ctx, next) => {
    let reqBody = Object.assign(ctx.request.body,{"id":ctx.params.id?ctx.params.id:ctx.state.JwtToken._id});
    ctx.body = await updateUserPassword(reqBody)
})
// 新增用户地址
.post('/userAddr',async (ctx, next) => {
    console.log('ctx: ', ctx.params.id);
    ctx.body = {
        name:ctx.params.id
    };
})
// 获取用户地址
.get('/userAddr/:id',async (ctx, next) => {
    console.log('ctx: ', ctx.params.id);
    ctx.body = {
        name:ctx.params.id
    };
})
// 获取用户地址列表
.get('/userAddr',async (ctx, next) => {
    ctx.body = {
        name:'userInfo'
    };
})
// 修改用户地址
.patch('/userAddr/:id',async (ctx, next) => {
    ctx.body = {
        name:'22'
    };
})
// 获取用户对应页面菜单

module.exports = router;
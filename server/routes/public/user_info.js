const router = require('koa-router')();
import { createUser,userLogin,getUserInfo,getUserInfoRole,getUserList,updateUserInfo,updateUserPassword } from '../../app/controller'
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
// 获取用户权限
.get('/userInfoRole',async (ctx, next) => {
    let reqBody = Object.assign(ctx.request.body,{"id":ctx.params.id?ctx.params.id:ctx.state.JwtToken._id,"user_type":ctx.state.JwtToken.user_type,"user_role":ctx.state.JwtToken.user_role});
    ctx.body = await getUserInfoRole(reqBody);
})
// 获取用户信息
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
        code:'0000',
        name:'22'
    };
})
// 获取用户对应页面菜单


.get('/testimg',async (ctx, next) => {
    ctx.body = {
        code: "0000",
        message: "成功",
        result:[
            {img:'https://img01.sogoucdn.com/app/a/07/80f2e20a98944a0fa662d3fc5f472e56',like:123,content:'尽量靠近疯狂减肥了快速的减肥开始觉得离开房间打开进风口第六十九六块腹肌都快就分开了多久分开解释道',time:'2020/05/07'},
            {img:'https://img03.sogoucdn.com/app/a/07/f13b5c3830f02b6db698a2ae43ff6a67',like:1234,content:'尽量靠近疯狂减肥了快速的减肥开始觉得离开房间打开进风口第六十九六块腹肌都快就分开了多久分开解释道',time:'2020/05/07'},
            {img:'https://img03.sogoucdn.com/app/a/07/b4f5a091fb5c7d40d7b74893392a705b',like:1235,content:'尽量靠近疯狂减肥了快速的减肥开始觉得离开房间打开进风口第六十九六块腹肌都快就分开了多久分开解释道',time:'2020/05/07'},
            {img:'https://img03.sogoucdn.com/app/a/07/e58d89131f3a0882b804313208e0e983',like:1236,content:'尽量靠近疯狂减肥了快速的减肥开始觉得离开房间打开进风口第六十九六块腹肌都快就分开了多久分开解释道',time:'2020/05/07'},
            {img:'https://img01.sogoucdn.com/app/a/07/80f2e20a98944a0fa662d3fc5f472e56',like:1237,content:'尽量靠近疯狂减肥了快速的减肥开始觉得离开房间打开进风口第六十九六块腹肌都快就分开了多久分开解释道',time:'2020/05/07'}
        ]
    };
})

module.exports = router;
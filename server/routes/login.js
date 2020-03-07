const router = require('koa-router')()
import { creatUser,findUser } from '../app/controller/user/customer_inf'
const datalize = require('datalize');
const field = datalize.field;

//注册
router.post('/register',datalize([
  field('login_name').required(), //登录名
  field('password').required(), //密码
  field('customer_email').email(), //邮箱 
  field('mobile_phone').required().phone(), //手机号码
]), async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await creatUser(reqBody);
});
//登录
router.post('/signin',datalize([
  field('login_name').required(), //登录名
  field('password').required(), //密码
  field('login_ip').required(), //登录IP
]), async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await findUser(reqBody);
});



module.exports = router

const router = require('koa-router')();
import { updateUser,getUserInfo } from '../app/controller/user/customer_inf';
const datalize = require('datalize');
const field = datalize.field;

//获取用户信息
router.post('/getUserInfo',async (ctx, next) => {
  let reqBody = Object.assign(ctx.request.body,{"id":ctx.state.JwtToken._id});
  ctx.body = await getUserInfo(reqBody);
});
//更新用户信息
router.post('/updateUser',datalize([
  field('customer_name').required(), //登录名
  field('identity_card_type').required(), //密码
  field('identity_card_no').email(), //邮箱 
  field('mobile_phone').required().phone(), //手机号码
]),async (ctx, next) => {
  let reqBody = Object.assign(ctx.request.body,{"id":ctx.state.JwtToken._id});
  ctx.body = await updateUser(reqBody);
});

module.exports = router;

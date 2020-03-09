const router = require('koa-router')();
import { updateUserInfo,getUserInfo } from '../app/controller/user/customer_inf';
const datalize = require('datalize');
const field = datalize.field;

//获取用户信息
router.post('/getUserInfo',async (ctx, next) => {
  let reqBody = Object.assign(ctx.request.body,{"id":ctx.state.JwtToken._id});
  ctx.body = await getUserInfo(reqBody);
});
//更新用户信息
router.post('/updateUserInfo',datalize([
  field('customer_name').required(), //登录名
  field('identity_card_type').required(), //
  field('identity_card_no').required(), //
  field('customer_email').email(),//邮箱 
  field('mobile_phone').required().phone(), //手机号码
]),async (ctx, next) => {
  let reqBody = Object.assign(ctx.request.body,{"id":ctx.state.JwtToken._id});
  console.log('reqBody: ', reqBody);
  ctx.body = await updateUserInfo(reqBody);
});
//获取用户地址
//更新用户地址

module.exports = router;

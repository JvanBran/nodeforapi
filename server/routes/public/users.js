const router = require('koa-router')();
import { 
  updateUserInfo , 
  getUserInfo , 
  getUserList , 
  getUserAddr , 
  updateUserAddr , 
  createUserAddr ,
} from '../../app/controller';
const datalize = require('datalize');
const field = datalize.field;

//获取用户信息
router.post('/getUserInfo',async (ctx, next) => {
  let reqBody = Object.assign(ctx.request.body,{"id":ctx.request.body.user_id?ctx.request.body.user_id:ctx.state.JwtToken._id});
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
  let reqBody = Object.assign(ctx.request.body,{"id":ctx.request.body.user_id?ctx.request.body.user_id:ctx.state.JwtToken._id});
  ctx.body = await updateUserInfo(reqBody);
});
//获取用户地址
router.post('/getUserAddr',datalize([
  field('pageNo').required(), //页码
  field('pageSize').required(), //条数
]),async (ctx, next) => {
  let reqBody = Object.assign(ctx.request.body,{"id":ctx.request.body.user_id?ctx.request.body.user_id:ctx.state.JwtToken._id});
  ctx.body = await getUserAddr(reqBody);
});
//创建用户地址
router.post('/createUserAddr',datalize([
  field('province').required(), //地区表中省份的ID
  field('city').required(), // 地区表中城市的ID
  field('district').required(), // 地区表中的区ID
  field('address').required(),//邮箱 
]),async (ctx, next) => {
  let reqBody = Object.assign(ctx.request.body,{"id":ctx.request.body.user_id?ctx.request.body.user_id:ctx.state.JwtToken._id});
  ctx.body = await createUserAddr(reqBody);
});
//更新用户地址
router.post('/updateUserAddr',datalize([
  field('addr_id').required(), //地址信息id
  field('province').required(), //地区表中省份的ID
  field('city').required(), // 地区表中城市的ID
  field('district').required(), // 地区表中的区ID
  field('address').required(),//邮箱 
]),async (ctx, next) => {
  let reqBody = Object.assign(ctx.request.body,{"id":ctx.request.body.user_id?ctx.request.body.user_id:ctx.state.JwtToken._id});
  ctx.body = await updateUserAddr(reqBody);
});
//获取用户列表
router.post('/getUserLists',datalize([
  field('pageNo').required(), //页码
  field('pageSize').required(), //条数
]),async (ctx, next) => {
  let reqBody = Object.assign(ctx.request.body);
  ctx.body = await getUserList(reqBody);
})

//获取用户权限
router.get('/info',async (ctx, next) => {
  console.log('ctx: ', ctx);
  ctx.body = {
    code:'0000',
    message:"1111",
    request:""
  };
})
// // 获取用户菜单
// router.get('/nav',async (ctx, next) => {
  
//   let reqBody = Object.assign(ctx.request.body,{"id":ctx.request.body.user_id?ctx.request.body.user_id:ctx.state.JwtToken._id});
//   ctx.body = await getUserMeunNav(reqBody);
// })

module.exports = router;

const router = require('koa-router')()
import { creatUser,findUser } from '../app/controller/userInfo'
const datalize = require('datalize');
const field = datalize.field;

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
//登录
router.post('/signIn',datalize([
  field('username').required(),
  field('password').required(),
]), async (ctx, next) => {
  console.log(ctx.form)
  let reqBody = ctx.request.body;
  ctx.body = await findUser(reqBody);
});
//注册
router.post('/register', async (ctx, next) => {
  let reqBody = ctx.request.body;
  ctx.body = await creatUser(reqBody);
});
//找回密码
router.post('/retrieve', async (ctx, next) => {
    let reqBody = ctx.request.body;
    ctx.body = await register(reqBody);
});
module.exports = router

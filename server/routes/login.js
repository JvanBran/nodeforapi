const router = require('koa-router')()
import {creatUser} from '../app/controller/userInfo'

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});
//登录
router.post('/signIn', async (ctx, next) => {
  console.log(ctx.request.body);
  let reqBody = ctx.request.body;
  ctx.body = await findUser(reqBody);
});
//注册
router.post('/register', async (ctx, next) => {
  console.log('ctx.request.body',ctx.request.body)
  let reqBody = ctx.request.body;
  ctx.body = await creatUser(reqBody);
});
//找回密码
router.post('/retrieve', async (ctx, next) => {
    console.log(ctx.request.body)
    let reqBody = ctx.request.body;
    ctx.body = await register(reqBody);
  });
//退出
router.get('/signOut', async (ctx, next) => {
    ctx.body = await getUserList(ctx, next);
});
module.exports = router

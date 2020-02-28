const router = require('koa-router')();
import { getUserList } from '../app/controller/userInfo'

router.get('/getUser', async (ctx, next) => {
  ctx.body = await getUserList(ctx, next);
});
module.exports = router;

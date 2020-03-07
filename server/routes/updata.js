const router = require('koa-router')();
import { getUpLoadToken } from '../app/controller/update/qiniu';

//更新用户信息
router.post('/updatetoken',async (ctx, next) => {
  ctx.body = await getUpLoadToken();
});

module.exports = router;

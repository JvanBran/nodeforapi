const router = require('koa-router')();
import { getUpLoadToken } from '../../app/controller/update/qiniu';

//获取七牛上传凭证
router.post('/updatetoken',async (ctx, next) => {
  ctx.body = await getUpLoadToken();
});

module.exports = router;

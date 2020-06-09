const router = require('koa-router')();
import { createdName } from '../../app/controller/sql';
router
.post('/test',async (ctx, next) => {
  let reqBody = Object.assign(ctx.request.body,{});
  ctx.body =  await createdName(reqBody);
});
module.exports = router;
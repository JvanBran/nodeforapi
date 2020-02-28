const router = require('koa-router')();
const jwt = require('jsonwebtoken');
import { getUserList } from '../app/controller/userInfo'

router.get('/getUser', async (ctx, next) => {
  let payload = await jwt.verify(ctx.header.authorization.split(' ')[1], 'test_token');
  console.log('payload: ', payload);
  
  ctx.body = await getUserList(ctx, next);
});
module.exports = router;

const jwt = require('jsonwebtoken');
const serverConfig = require('../config/serverConfig.js'); 
import { errdata } from '../utils/serve'
const koaJwtVerify = () => {
    return async (ctx, next) => {
        try {
            const token = ctx.header.authorization;
            if(token){
                let payload;
                try {
                    payload = await jwt.verify(ctx.header.authorization.split(' ')[1], serverConfig.jwt_token);
                    try {
                        if(payload){
                            ctx.state.user = payload
                        }else{
                            console.log('token verify fail1',error);
                            ctx.status = 200
                            ctx.body = errdata(null,'9999', '鉴权失败1')
                            return
                        }
                    } catch (error) {
                        console.log('token verify fail2',error.name);
                        ctx.status = 200
                        ctx.body = errdata(null,'9999', '找不到用户')
                        return
                    }
                    
                } catch (error) {
                    console.log('error',error.name)
                    if(error.name == 'TokenExpiredError'){
                        ctx.status = 200
                        //ctx.res.setHeader('Authorization', newToken);
                        ctx.body = errdata(null,'9999', 'token过期')
                    }else{
                        ctx.status = 200
                        ctx.body = errdata(null,'9999', 'token不完整')
                        return
                    }
                }
            }
            await next()
        } catch (error) {
            // console.log(error)
            if(error.status === 401){
                ctx.status = 200
                ctx.body = errdata(null,'9999', '缺少token')
            }else{
                ctx.status = 404
                ctx.body = errdata(null,'9999', '找不到页面')
            }
        }
    }
}

module.exports = koaJwtVerify
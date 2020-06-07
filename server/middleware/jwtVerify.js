//jwt token有效性校验
const jwt = require('jsonwebtoken');
const serverConfig = require('../config/serverConfig.js'); 
import { errdata } from '../utils/serve'
const jwtVerify = () => {
    return async (ctx, next) => {
        try {
            const token = ctx.header.authorization;
            if(token){
                let payload;
                try {
                    payload = await jwt.verify(ctx.header.authorization.split(' ')[1], serverConfig.jwt_token);
                    try {
                        if(payload){
                            ctx.state.JwtToken = payload
                        }else{
                            ctx.status = 200
                            ctx.body = errdata({},'9999', '请重新登录！')
                            return
                        }
                    } catch (error) {
                        ctx.status = 200
                        ctx.body = errdata({},'9999', '请重新登录！')
                        return
                    }
                    
                } catch (error) {
                    ctx.status = 200
                    ctx.body = errdata({},'9999', '请重新登录！')
                }
            }else{
                ctx.body = errdata({},'9999', '请登录！')
            }
            await next()
        } catch (error) {
            ctx.status = 200
            ctx.body = errdata({},'9999', '请重新登录！')
        }
    }
}

module.exports = jwtVerify
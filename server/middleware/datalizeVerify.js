//datalize 表单校验及自定义校验规则
import { errdata } from '../utils/serve'
const datalize = require('datalize');
// set datalize to throw an error if validation fails
datalize.set('autoValidate', true);


const Field = datalize.Field;
//自定义过滤器，你就可以用.dateTime() 过滤器链接字段对日期输入进行验证
Field.prototype.dateTime = function(format = 'YYYY-MM-DD HH:mm') {
    return this.date(format);
};
const datalizeVerify = () => {
    return async (ctx, next) => {
        try {
            await next()
        } catch (error) {
            if (error instanceof datalize.Error) {
                ctx.status = 200;
                console.log(error.toJSON())
                ctx.body = errdata(error.toJSON().errors,9998,'参数错误')
            }
        }
    }
}

module.exports = datalizeVerify
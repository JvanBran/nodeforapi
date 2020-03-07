//用户登录表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
let Schema = mongoose.Schema;
let customerLoginSchema = new Schema({
    login_name:String,   //用户登录名
	password: String,   //md5加密的密码
    user_stats: {
        type:Number,
        default:1
    },//用户状态
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
customerLoginSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class CustomerLogin extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("customer_login", customerLoginSchema);
        this.dataType = {
            login_name: '',
            password: ''
        }
    }
}
let customerLogin = new CustomerLogin()
export {customerLogin}
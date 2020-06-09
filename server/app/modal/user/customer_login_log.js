//用户登陆日志表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let customerLoginLogSchema = new Schema({
    customer_id:String,   //用户ID
    login_ip:String, //登陆IP
    login_type:Number, //登陆类型：0未成功，1成功
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
customerLoginLogSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class CustomerLoginLog extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("customer_login_log", customerLoginLogSchema);
        this.dataType = {
            customer_id:'',   //用户ID
            login_ip:'', //登陆IP
            login_type: '', //登陆类型：0未成功，1成功
        }
    }
}

let customerLoginLog = new CustomerLoginLog()
export {customerLoginLog}
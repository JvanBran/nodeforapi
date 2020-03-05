//用户登陆日志表
let mongoose = require("mongoose");
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let customerLoginLogSchema = new Schema({
    login_id: Schema.Types.ObjectId, //登陆日志ID
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
class CustomerLoginLog{
    constructor(){
        this.customer_login_log = mongoose.model("customer_login_log", customerLoginLogSchema);
    }
}

let customerLoginLog = new CustomerLoginLog()
export {customerLoginLog}
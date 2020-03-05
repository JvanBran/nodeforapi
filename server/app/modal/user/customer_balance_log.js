//用户余额变动表
let mongoose = require("mongoose");
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let customerBalanceLogSchema = new Schema({
    balance_id: Schema.Types.ObjectId, //余额日志ID
    customer_id:String,   //用户ID
    source: {
        type:Number,
        default:1
    },   //记录来源：1订单，2退货单
    source_sn:String, //相关单据ID
    amount:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    }, //变动金额
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
customerBalanceLogSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class CustomerBalanceLog{
    constructor(){
        this.customer_balance_log = mongoose.model("customer_balance_log", customerBalanceLogSchema);
    }
}

let customerBalanceLog = new CustomerBalanceLog()
export {customerBalanceLog}
//用户消费表
let mongoose = require("mongoose");
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let customerConsumptionLogSchema = new Schema({
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
customerConsumptionLogSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class CustomerConsumptionionLog{
    constructor(){
        this.mongooseModel = mongoose.model("customer_consumption_log", customerConsumptionLogSchema);
        this.dataType={
            customer_id:'',   //用户ID
            source: '',   //记录来源：1订单，2退货单
            source_sn:'', //相关单据ID
            amount:'', //变动金额
        }
    }
}

let customerConsumptionLog = new CustomerConsumptionionLog()
export {customerConsumptionLog}
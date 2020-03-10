//支付表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let mmallPayInfoSchema = new Schema({
    customer_id: String,// 用户id',
    order_sn: String,// 订单号',
    pay_platform:{
        type:Number,
        default:2
    },// 支付方式：1现金，2余额，3网银，4支付宝，5微信
    platform_number:String,// 支付宝支付流水号
    platform_status:Number,// 支付状态
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
mmallPayInfoSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class MmallPayInfo extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("mmall_pay_info", mmallPayInfoSchema);
        this.dataType = {
            customer_id:'',// 用户id',
            order_sn:'',// 订单号',
            pay_platform:'',// 支付方式：1现金，2余额，3网银，4支付宝，5微信
            platform_number:'',// 支付宝支付流水号
            platform_status:'',// 支付状态
        }
    }
}

let mmallPayInfo = new MmallPayInfo()
export {mmallPayInfo}
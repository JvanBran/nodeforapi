//订单主表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let orderMasterSchema = new Schema({
    order_sn: String,// '订单编号 yyyymmddnnnnnnnn
    customer_id: String,// 下单人ID
    shipping_user: String,// 收货人姓名
    province: String,// 省
    city: String,// 市
    district: String,// 区
    address: String,// 地址
    payment_method: Number,// 支付方式：1现金，2余额，3网银，4支付宝，5微信
    order_money:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 订单金额
    district_money:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 优惠金额
    shipping_money:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 运费金额
    payment_money:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 支付金额
    shipping_comp_name: String,// 快递公司名称
    shipping_sn: String,// 快递单号
    create_time:{
        type: Date,
        dafault: Date.now()
    },// 下单时间
    shipping_time:{
        type: Date,
        dafault: Date.now()
    },// 发货时间
    pay_time:{
        type: Date,
        dafault: Date.now()
    },// 支付时间
    receive_time:{
        type: Date,
        dafault: Date.now()
    },// 收货时间
    order_status:{
        type: Number,
        default:0
    },// 订单状态
    order_point:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 订单积分
    invoice_time: String,// 发票抬头
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
orderMasterSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class OrderMaster extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("order_master", orderMasterSchema);
        this.dataType = {
            order_sn:'',// '订单编号 yyyymmddnnnnnnnn
            customer_id:'',// 下单人ID
            shipping_user:'',// 收货人姓名
            province:'',// 省
            city:'',// 市
            district:'',// 区
            address:'',// 地址
            payment_method:'',// 支付方式：1现金，2余额，3网银，4支付宝，5微信
            order_money:'',// 订单金额
            district_money:'',// 优惠金额
            shipping_money:'',// 运费金额
            payment_money:'',// 支付金额
            shipping_comp_name:'',// 快递公司名称
            shipping_sn:'',// 快递单号
            create_time:'',// 下单时间
            shipping_time:'',// 发货时间
            pay_time:'',// 支付时间
            receive_time:'',// 收货时间
            order_status:'',// 订单状态
            order_point:'',// 订单积分
            invoice_time:'',// 发票抬头
        }
    }
}

let orderMaster = new OrderMaster()
export {orderMaster}
//订单详情表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let orderDetailSchema = new Schema({
    order_id: String,// 订单表ID
    product_id: String,// 订单商品ID
    product_name: String,// 商品名称
    product_cnt:{
        type:Number,
        default:1
    },// 购买商品数量
    product_price:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 购买商品单价
    average_cost:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 平均成本价格
    weight:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 商品重量
    fee_money:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 优惠分摊金额
    w_id:String,// 仓库ID
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
orderDetailSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class OrderDetail extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("order_detail", orderDetailSchema);
        this.dataType = {
            order_id:'',// 订单表ID
            product_id:'',// 订单商品ID
            product_name:'',// 商品名称
            product_cnt:'',// 购买商品数量
            product_price:'',// 购买商品单价
            average_cost:'',// 平均成本价格
            weight:'',// 商品重量
            fee_money:'',// 优惠分摊金额
            w_id:'',// 仓库ID
        }
    }
}

let orderDetail = new OrderDetail()
export {orderDetail}
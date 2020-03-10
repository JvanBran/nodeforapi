//购物车表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let orderCartSchema = new Schema({
    customer_id: String,// 用户ID
    product_id: String,// 商品ID
    product_amount: String,// 加入购物车商品数量
    price:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 商品价格
    add_time:{
        type: Date,
        dafault: Date.now()
    },// 加入购物车时间
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
orderCartSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class OrderCart extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("order_cart", orderCartSchema);
        this.dataType = {
            customer_id:'',// 用户ID
            product_id:'',// 商品ID
            product_amount:'',// 加入购物车商品数量
            price:'',// 商品价格
            add_time:'',// 加入购物车时间
        }
    }
}

let orderCart = new OrderCart()
export {orderCart}
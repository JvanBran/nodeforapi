//仓库信息表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let shippingInfoSchema = new Schema({
    ship_name: String,// 物流公司名称
    ship_contact: String,// 物流公司联系人
    telephone: String,// 物流公司联系电话
    price:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 配送价格
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
shippingInfoSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class ShippingInfo extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("shipping_info", shippingInfoSchema);
        this.dataType = {
            ship_name:'',// 物流公司名称
            ship_contact:'',// 物流公司联系人
            telephone:'',// 物流公司联系电话
            price:'',// 配送价格
        }
    }
}

let shippingInfo = new ShippingInfo()
export {shippingInfo}
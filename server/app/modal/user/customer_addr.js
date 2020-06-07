//用户地址表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
let Schema = mongoose.Schema;
let customerAddrSchema = new Schema({
    customer_id:String,   //customer_login表的自增ID
    zip: String,   //邮编
    province: String, //地区表中省份的ID
    city: String,// 地区表中城市的ID
    district: String, // 地区表中的区ID
    address: String,// 具体的地址门牌号
    is_default: {
        type:Number,
        default:0
    },// 是否默认
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
customerAddrSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class CustomerAddr extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("customer_addr", customerAddrSchema);
        this.dataType = {
            _id:'',//地址id
            customer_id:'', //customer_login表的自增ID
            zip: '', //邮编
            province: '', //地区表中省份的ID
            city: '',// 地区表中城市的ID
            district: '', // 地区表中的区ID
            address: '',// 具体的地址门牌号
            is_default: '',// 是否默认
        }
    }
}

let customerAddr = new CustomerAddr()
export {customerAddr}
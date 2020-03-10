//品牌信息表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let brandInfSchema = new Schema({
    brand_name: String, //品牌名称
    telephone: String,   //联系电话
    brand_web: String,   //品牌网络
    brand_logo: String,   //品牌logo URL
    brand_desc: String,   //品牌描述
    brand_status:{
        type: Number,
        default: 0
    }, //品牌状态,0禁用,1启用
    brand_order:{
        type: Number,
        dafault: 0
    }, //排序
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
brandInfSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class BrandInf extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("brand_info", brandInfSchema);
        this.dataType = {
            brand_name: '', //品牌名称
            telephone: '',   //联系电话
            brand_web: '',   //品牌网络
            brand_logo: '',   //品牌logo URL
            brand_desc: '',   //品牌描述
            brand_status:'', //品牌状态,0禁用,1启用
            brand_order:'', //排序
        }
    }
}

let brandInf = new BrandInf()
export {brandInf}
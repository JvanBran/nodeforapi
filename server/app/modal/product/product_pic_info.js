//商品图片信息表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let productPicInfoSchema = new Schema({
    product_id:String,// 商品ID
    pic_desc:String,// 图片描述
    pic_url:String,// 图片URL
    is_master:{
        type:Number,
        default:0
    },// 是否主图：0.非主图1.主图
    pic_order:{
        type:Number,
        default:0
    },// 图片排序
    pic_status:{
        type:Number,
        default:1
    },// 图片是否有效：0无效 1有效
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
productPicInfoSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class ProductPicInfo extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("product_pic_info", productPicInfoSchema);
        this.dataType = {
            product_id:'',// 商品ID
            pic_desc:'',// 图片描述
            pic_url:'',// 图片URL
            is_master:'',// 是否主图：0.非主图1.主图
            pic_order:'',// 图片排序
            pic_status:'',// 图片是否有效：0无效 1有效
        }
    }
}

let productPicInfo = new ProductPicInfo()
export {productPicInfo}
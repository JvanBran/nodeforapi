//分类信息表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let productCategorySchema = new Schema({
    category_name: String, //分类名称
    category_code: String,   //分类编码
    parent_id: {
        type:String,
        default:0
    },   //父分类ID
    category_level: {
        type:Number,
        default:1
    },   //分类层级
    category_status: {
        type:Number,
        default:1
    },   //分类状态
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
productCategorySchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class ProductCategory extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("product_category", productCategorySchema);
        this.dataType = {
            category_name: '', //分类名称
            category_code: '',   //分类编码
            parent_id: '',   //父分类ID
            category_level: '',   //分类层级
            category_status: '',   //分类状态
        }
    }
}

let productCategory = new ProductCategory()
export {productCategory}
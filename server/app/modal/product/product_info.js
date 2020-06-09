//商品信息表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let productInfoSchema = new Schema({
    product_core: String, // 商品编码
    product_name: String,// 商品名称
    bar_code: String,// 国条码
    brand_id: String,//品牌表的ID
    one_category_id: String,//一级分类ID
    two_category_id: String,//二级分类ID
    three_category_id: String,//三级分类ID
    supplier_id: String,// 商品的供应商ID
    price:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },//商品销售价格
    average_cost:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 商品加权平均成本
    publish_status:{
        type:Number,
        default:0
    },// 上下架状态：0下架1上架
    audit_status:{
        type:Number,
        default:0
    },// 审核状态：0未审核，1已审核
    weight:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 商品重量
    length:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 商品长度
    height:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 商品高度
    width:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 商品宽度
    color_type:{
        type:Arrays,
        default:['红','黄','蓝','黑']
    },// 颜色
    production_date:{  
        type: Date,
        dafault: Date.now()
    }, // 生产日期
    descript :'',//商品描述
	createTime:{    
        type: Date,
        dafault: Date.now()
    },//创建时间
	updateTime:{    
        type: Date,
        dafault: Date.now()
    },//修改时间
})
productInfoSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class ProductInfo extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("product_info", productInfoSchema);
        this.dataType = {
            product_core:'', // 商品编码
            product_name:'',// 商品名称
            bar_code:'',// 国条码
            brand_id:'',//品牌表的ID
            one_category_id:'',//一级分类ID
            two_category_id:'',//二级分类ID
            three_category_id:'',//三级分类ID
            supplier_id:'',// 商品的供应商ID
            price:'',//商品销售价格
            average_cost:'',// 商品加权平均成本
            publish_status:'',// 上下架状态：0下架1上架
            audit_status:'',// 审核状态：0未审核，1已审核
            weight:'',// 商品重量
            length:'',// 商品长度
            height:'',// 商品高度
            width:'',// 商品宽度
            color_type:'',// '红','黄','蓝','黑'
            production_date:'', // 生产日期
            shelf_life:'',// 商品有效期
            descript :'',//商品描述
        }
    }
}

let productInfo = new ProductInfo()
export {productInfo}
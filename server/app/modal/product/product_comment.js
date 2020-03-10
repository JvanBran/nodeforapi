//供应商信息表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let productCommentSchema = new Schema({
    product_id: String,// 商品ID
    order_id: String,// 订单ID
    customer_id: String,// 用户ID
    title: String,// 评论标题
    content: String,// 评论内容
    audit_status:{
        type:Number,
        default:0
    },// 审核状态：0未审核，1已审核
    audit_time:{ 
        type: Date,
        dafault: Date.now()
    },// 评论时间
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
productCommentSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class ProductComment extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("product_comment", productCommentSchema);
        this.dataType = {
            product_id:'',// 商品ID
            order_id:'',// 订单ID
            customer_id:'',// 用户ID
            title:'',// 评论标题
            content:'',// 评论内容
            audit_status:'',// 审核状态：0未审核，1已审核
            audit_time:'',// 评论时间
        }
    }
}

let productComment = new ProductComment()
export {productComment}
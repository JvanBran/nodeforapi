//仓库信息表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let warehouseProductSchema = new Schema({
    product_id: String,// 商品ID
    w_id: String,// 仓库ID
    current_cnt:{
        type: Number,
        default:0
    },// 当前商品数量
    lock_cnt:{
        type: Number,
        default:0
    },// 当前占用数据
    in_transit_cnt:{
        type: Number,
        default:0
    },// 在途数据
    average_cost:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },// 移动加权成本

	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
warehouseProductSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class WarehouseProduct extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("warehouse_product", warehouseProductSchema);
        this.dataType = {
            product_id:'',// 商品ID
            w_id:'',// 仓库ID
            current_cnt:'',// 当前商品数量
            lock_cnt:'',// 当前占用数据
            in_transit_cnt:'',// 在途数据
            average_cost:'',// 移动加权成本
        }
    }
}

let warehouseProduct = new WarehouseProduct()
export {warehouseProduct}
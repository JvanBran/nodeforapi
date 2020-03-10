//仓库信息表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let warehouseInfoSchema = new Schema({
    warehouse_sn: String,// 仓库编码
    warehoust_name: String,// 仓库名称
    warehouse_phone: String,// 仓库电话
    contact: String,// 仓库联系人
    province: String,// 省
    city: String,// 市
    distrct: String,// 区
    address: String,// 仓库地址
    warehouse_status:{
        type:Number,
        default:1
    },// 仓库状态：0禁用，1启用
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
warehouseInfoSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class WarehouseInfo extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("warehouse_info", warehouseInfoSchema);
        this.dataType = {
            warehouse_sn:'',// 仓库编码
            warehoust_name:'',// 仓库名称
            warehouse_phone:'',// 仓库电话
            contact:'',// 仓库联系人
            province:'',// 省
            city:'',// 市
            distrct:'',// 区
            address:'',// 仓库地址
            warehouse_status:'',// 仓库状态：0禁用，1启用
        }
    }
}

let warehouseInfo = new WarehouseInfo()
export {warehouseInfo}
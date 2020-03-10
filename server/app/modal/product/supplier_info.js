//供应商信息表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let supplierInfoSchema = new Schema({
    supplier_code: String, //供应商编码
    supplier_name: String,   //供应商名称
    supplier_type: String, //供应商类型：1.自营，2.平台
    link_man: String,   //供应商联系人
    phone_number: String, //联系电话
    bank_name: String,   //供应商开户银行名称
    bank_account: String, //银行账号
    address: String,   //供应商地址
    supplier_status: {
        type:Number,
        default:0
    }, //状态：0禁止，1启用
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
supplierInfoSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class SupplierInfo extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("supplier_info", supplierInfoSchema);
        this.dataType = {
            supplier_code: '', //供应商编码
            supplier_name: '',   //供应商名称
            supplier_type: '', //供应商类型：1.自营，2.平台
            link_man: '',   //供应商联系人
            phone_number: '', //联系电话
            bank_name: '',   //供应商开户银行名称
            bank_account: '', //银行账号
            address: '',   //供应商地址
            supplier_status: '', //状态：0禁止，1启用
        }
    }
}

let supplierInfo = new SupplierInfo()
export {supplierInfo}
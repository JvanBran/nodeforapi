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
    is_default: Number,// 是否默认
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
    }
    create(dataArr) {
        const self = this;
        return new Promise(function (resolve, reject){
            let user = new self.mongooseModel({
                customer_id:dataArr.customer_id,
				zip: dataArr.zip,
                province: dataArr.province,
                city: dataArr.city,
                district: dataArr.district,
                address: dataArr.address,
                is_default: dataArr.is_default
            });
            user.save(function(e, data, numberAffected) {
                // if (e) response.send(e.message);
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
}

let customerAddr = new CustomerAddr()
export {customerAddr}
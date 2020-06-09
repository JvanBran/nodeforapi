//用户登录表
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let customerInfSchema = new Schema({
    customer_id: String, //customer_login表的自增ID
    customer_name: String,   //用户真实姓名
    identity_card_type:{
        type: Number,
        default: 1
    }, //证件类型：1 身份证，2 军官证，3 护照,
    identity_card_no: String, //证件号码
    mobile_phone: String,    //手机号
    customer_email: String,  //邮箱
    gender:Number,  //性别
    user_point:Number,  //用户积分
    user_type:{
        type:Number,
        default:0
    },//用户类型 0 普通用户
    user_role:{
        type:Array,
        default:[]
    }, //用户角色
    birthday:{
        type: Date,
        dafault: Date.now()
    }, //会员生日
    customer_level:{
        type:Number,
        default:1
    },  // 会员级别：1 普通会员，2 青铜，3白银，4黄金，5钻石
    user_money:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    }, //用户余额
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
customerInfSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class CustomerInf extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("customer_inf", customerInfSchema);
        this.dataType = {
            customer_id: '', //customer_login表的自增ID
            customer_name: '',   //用户真实姓名
            identity_card_type:'', //证件类型：1 身份证，2 军官证，3 护照,
            identity_card_no: '', //证件号码
            mobile_phone:'',    //手机号
            customer_email:'',  //邮箱
            gender:'',  //性别
            user_point:'',  //用户积分
            birthday:'', //会员生日
            customer_level:'',  // 会员级别：1 普通会员，2 青铜，3白银，4黄金，5钻石
            user_money:'', //用户余额
        }
    }
}

let customerInf = new CustomerInf()
export {customerInf}
//用户登录表
let mongoose = require("mongoose");
require('mongoose-double')(mongoose);

let Schema = mongoose.Schema;
let customer_inf_Schema = new Schema({
    customer_inf_id: Schema.Types.ObjectId, //自增主键ID
    customer_id:Number, //customer_login表的自增ID
    customer_name:String,   //用户真实姓名
    identity_card_type:{
        type:Number,
        default:1
    }, //证件类型：1 身份证，2 军官证，3 护照,
    identity_card_no:Number, //证件号码
    mobile_phone:Number,    //手机号
    customer_email:String,  //邮箱
    gender:Number,  //性别
    user_point:Number,  //用户积分
    register_time:{
        type: Date,
        dafault: Date.now()
    },  //注册时间
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
    }, //DECIMAL(8,2) NOT NULL DEFAULT 0.00 COMMENT '用户余额',
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
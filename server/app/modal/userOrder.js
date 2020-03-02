let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let userInfoSchema = new Schema({
    username:String, //用户名
    phone:String,   //手机号
	password: String,   //密码
    sex: Number,    //性别 0女1男
    imgUrl: String, //头像地址
    email:String,   //邮箱
    type:Number,    //用户类型 0超级管理1普通用户
    remark:String,  //描述
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
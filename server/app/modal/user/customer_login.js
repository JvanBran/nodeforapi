//用户登录表
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let customer_login_Schema = new Schema({
    customer_id: Schema.Types.ObjectId, //用户ID
    login_name:String,   //用户登录名
	password: String,   //md5加密的密码
    user_stats: Number,    //用户状态
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
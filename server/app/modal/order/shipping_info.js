//物流公司信息表
let mongoose = require("mongoose");
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let userInfoSchema = new Schema({
    ship_id:Schema.Types.ObjectId,  //主键ID',
    ship_name:String,// 物流公司名称
    ship_contact: String,// 物流公司联系人
    telephone:String,//物流公司联系电话
    price:{
        type:mongoose.Schema.Types.Double,
        default:0.00
    },  //配送价格
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
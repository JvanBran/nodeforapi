//用户级别信息表
let mongoose = require("mongoose");
require('mongoose-double')(mongoose);

let Schema = mongoose.Schema;
let customerLevelInfSchema = new Schema({
    level_name:String, //会员级别名称
    min_point:{
        type:Number,
        default:0
    }, //该级别最低积分
    modified_time:{
        type:Number,
        default:0
    }, //该级别最低积分
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
customerLevelInfSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class CustomerLevelInf{
    constructor(){
        this.customer_level_inf = mongoose.model("customer_level_inf", customerLevelInfSchema);
        this.dataType={
            level_name:'', //会员级别名称
            min_point:'', //该级别最低积分
            modified_time:'', //该级别最低积分
        }
    }
}

let customerLevelInf = new CustomerLevelInf()
export {customerLevelInf}
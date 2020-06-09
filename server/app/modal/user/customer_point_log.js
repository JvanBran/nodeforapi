//用户积分日志表
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let customerPointLogSchema = new Schema({
    customer_id:String,   //用户ID
    source: Number,   //积分来源：0订单，1登陆，2活动
    refer_number: {
        type:Number,
        default:0
    }, //积分来源相关编号
    change_point: {
        type:Number,
        default:0
    },// 变更积分数
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
customerPointLogSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class CustomerPointLog{
    constructor(){
        this.customer_point_log = mongoose.model("customer_point_log", customerPointLogSchema);
        this.dataType={
            customer_id:'',   //用户ID
            source: '',   //积分来源：0订单，1登陆，2活动
            refer_number: '', //积分来源相关编号
            change_point: '',// 变更积分数
        }
    }
}

let customerPointLog = new CustomerPointLog()
export {customerPointLog}
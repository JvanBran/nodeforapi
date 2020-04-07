//后台菜单
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let systemRoleInfoSchema = new Schema({
    role_name:String, //角色名
    describe:String, //描述
    status:String,// 启用状态
    creatorId:String,// 创建用户
    pagepermissionList:{
        type:Array,
        default:[]
    },//页面权限和按钮构成的对象
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
systemRoleInfoSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class SystemRoleInfo extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("system_role_info", systemRoleInfoSchema);
        this.dataType = {
            _id:"", //当前id
            role_name:"", //角色名
            describe:"", //描述
            status:"",// 启用状态
            creatorId:"",// 创建用户
            pagepermissionList:'',//页面权限和按钮构成的对象
            
        }
    }
}

let systemRoleInfo = new SystemRoleInfo()
export {systemRoleInfo}
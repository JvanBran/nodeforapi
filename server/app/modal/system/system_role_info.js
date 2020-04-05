//后台菜单
let mongoose = require("mongoose");
import {AuxiliaryClass} from '../util';
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;
let muenNavInfoSchema = new Schema({
    parent_id: {
        type:String,
        default:0
    },
    title:String, //栏目标题
    path:String, //栏目路由路径
    name:String, //栏目路由名
    component:String, //栏目文件地址 模版或者页面import
    redirect:String, //如果是组则为默认跳转页面否则为空
    icon:String, //栏目图标 只有组标题才显示
    keepAlive:{
        type:Boolean,
        default:true
    },//是否需要缓存状态
    permission:String, //权限名
    permissionList:{
        type:Array,
        default:['add','import','get','update','delete','export','query']
    },//页面具有权限
    isShow:{
        type:Boolean,
        default:true
    }, //是否显示    前端则是删除
    show:{
        type:Boolean,
        default:false
    }, //是否在列表显示
    target:String, //打开方式
	createTime:{    //创建时间
        type: Date,
        dafault: Date.now()
    },
	updateTime:{    //修改时间
        type: Date,
        dafault: Date.now()
    },
})
muenNavInfoSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class SystemMuenNavInf extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("system_muennav_info", muenNavInfoSchema);
        this.dataType = {
            _id:"", //当前id
            role_name:"", //角色名
            role_permission_page: "",// 角色拥有的页面
            role_page_permission: "",// 角色拥有的页面权限
        }
    }
}

let systemMuenNavInf = new SystemMuenNavInf()
export {systemMuenNavInf}
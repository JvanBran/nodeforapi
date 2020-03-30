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
    hideChildren:{
        type:Boolean,
        default:false
    }, // 强制显示 MenuItem 而不是 SubMenu
    permission:{
        type:Array,
        default:[]
    }, //权限名
    hideHeader: {
        type:Boolean,
        default:false
    }, //
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
class MuenNavInf extends AuxiliaryClass{
    constructor(){
        super()
        this.mongooseModel = mongoose.model("muen_nav_info", muenNavInfoSchema);
        this.dataType = {
            _id:"", //当前id
            parent_id:'', //父级id

            title:'', //栏目标题
            path:'', //栏目路由路径
            name:'', //栏目路由名

            component:'', //栏目文件地址 模版或者页面import

            redirect:'', //如果是组则为默认跳转页面否则为空
            icon:'', //栏目图标 只有组标题才显示
            keepAlive:'',//是否需要缓存状态
            hideChildren:'', // 强制显示 MenuItem 而不是 SubMenu
            hideHeader: '', //
            permission:'', //权限名
            isShow:'', //是否显示    前端则是删除
            show:'', //是否在列表上显示
            target:'', //打开方式
        }
    }
}

let muenNavInf = new MuenNavInf()
export {muenNavInf}
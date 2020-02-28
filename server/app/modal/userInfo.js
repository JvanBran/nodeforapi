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
userInfoSchema.pre('save', function(next) {
    if (this.isNew) {
      this.createTime = this.updateTime = Date.now()
    }
    else {
      this.updateTime = Date.now()
    }
    next()
})
class UserInfo{
    constructor(){
        this.userInfo = mongoose.model("userInfo", userInfoSchema);
    }
    find(dataArr={}) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.userInfo.find(dataArr, function(e, docs) {
                if(e){
                    console.log('e:',e);
                    reject(e);
                }else{
                    resolve(docs);
                }
            })
        })
    }
    create(dataArr) {
        const self = this;
        return new Promise(function (resolve, reject){
            let user = new self.userInfo({
				username:dataArr.username, //用户名
                phone:dataArr.phone,   //手机号
                password: dataArr.password,   //密码
                sex: dataArr.sex,    //性别
                imgUrl: dataArr.imgUrl, //头像地址
                email:dataArr.email,   //邮箱
                type:dataArr.type?dataArr.type:1 //普通用户
            });
            user.save(function(e, data, numberAffected) {
                // if (e) response.send(e.message);
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
    update(option={}, dataArr={}){
        const self = this;
        return new Promise(function (resolve, reject){
            self.userInfo.update(option, dataArr,function(e, data) {
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
    delete(dataArr) {
        const self = this;
        return new Promise(function (resolve, reject){
            self.userInfo.remove({
                _id: dataArr.id
            }, function(e, data) {
                if(e){
                    reject(e);
                }else{
                    resolve(data);
                }
            });
        })
    }
}
let userInfo=new UserInfo()
export {userInfo}
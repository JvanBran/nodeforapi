const jwt = require('jsonwebtoken');
import { userInfo } from '../modal/userInfo'
import { resdata, errdata } from '../../utils/serve'

//创建用户
exports.creatUser = async (reqBody) => {
    let dataArr = {
        username:reqBody.username, //用户名
        phone:reqBody.phone,   //手机号
        password: reqBody.password,   //密码
        sex: reqBody.sex,    //性别
        imgUrl: reqBody.imgUrl, //头像地址
        email:reqBody.email,   //邮箱
        type:reqBody.type //用户
    }
    try {
        let list = await userInfo.find({username: reqBody.username,phone:reqBody.phone,email:reqBody.email});
        let respon = {};
        if(list && list.length > 0) {
            respon = resdata('9996', '用户已存在',{});
        }else {
            let newUserInfo = await userInfo.create(dataArr);
            respon = resdata('0000', '成功', newUserInfo);
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}
//用户登录
exports.findUser = async(reqBody) => {
    let dataArr = {
        username:reqBody.username, //用户名
        password: reqBody.password,   //密码
    }
    try {
        let list = await userInfo.find(dataArr);
        let respon = {};
        if(list && list.length > 0) {
            const tokenObj = {
                username:list[0].username, //用户名
                phone:list[0].phone,   //手机号
                sex: list[0].sex,    //性别
                imgUrl: list[0].imgUrl, //头像地址
                email:list[0].email,   //邮箱
                type:list[0].type, //用户
                _id: list[0]._id
            }
            const token = jwt.sign(tokenObj, 'test_token', { expiresIn: '2h' });
            respon = resdata('0000', '登录成功',{'token':token});
        }else {
            respon = resdata('9997', '用户不存在', {});
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}
//获取注册用户列表
exports.getUserList = async(reqBody) => {
    try {
        let list = await userInfo.find();
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}
//修改用户信息
exports.updateUser = async(reqBody) => {
    let dataArr = {
        username:reqBody.username, //用户名
        phone:reqBody.phone,   //手机号
        password: reqBody.password,   //密码
        sex: reqBody.sex,    //性别
        imgUrl: reqBody.imgUrl, //头像地址
        email:reqBody.email,   //邮箱
        type:reqBody.type //用户
    }
    try {
        let list = await userInfo.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            let newUser = await userInfo.update({_id: reqBody.id}, dataArr);
            console.log(newUser);
            respon = resdata('0000', '修改成功', newUser);
        }else {
            
            respon = resdata('9997', '用户不存在');
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}
//删除用户
exports.removeUser = async (reqBody) => {
    let dataArr = {
        id: reqBody.id,
    }
    try {
        let list = await userInfo.find({username: reqBody.uname});
        let respon = {}
        if(list && list.length > 0) {
            let list = await userInfo.delete(dataArr);
            respon = resdata('0000', 'success', list);
        }else {
            respon = resdata('0000', 'the id is not exicet', list);
        }
        return respon;
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}

//获取用户详情



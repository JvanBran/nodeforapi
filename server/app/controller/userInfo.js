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
            respon = resdata('0000', '用户已存在',{});
        }else {
            let newUserInfo = await userInfo.create(dataArr);
            console.log(newUserInfo);
            respon = resdata('0000', 'success', newUserInfo);
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
            const token = jwt.sign({
                username:list[0].username, //用户名
                phone:list[0].phone,   //手机号
                sex: list[0].sex,    //性别
                imgUrl: list[0].imgUrl, //头像地址
                email:list[0].email,   //邮箱
                type:list[0].type, //用户
                _id: list[0]._id
            }, 'test_token', { expiresIn: '2h' });
            respon = resdata('0000', '登录成功',{'token':token});
        }else {
            respon = resdata('9999', '用户不存在', {});
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
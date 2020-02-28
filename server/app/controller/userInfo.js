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
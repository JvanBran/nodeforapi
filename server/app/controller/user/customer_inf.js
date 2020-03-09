import { resdata, errdata } from '../../../utils/serve'
import { customerInf , customerLogin , customerAddr , customerLoginLog } from '../../modal/user'
import { jwt_token } from '../../../config/serverConfig'
const jwt = require('jsonwebtoken');

exports.creatUser = async (reqBody) => {
    let dataArr = {
        login_name:reqBody.login_name,
        password:reqBody.password,
        customer_name: reqBody.customer_name,
        identity_card_type: reqBody.identity_card_type,
        identity_card_no: reqBody.identity_card_no,
        mobile_phone: reqBody.mobile_phone,
        customer_email: reqBody.customer_email,
        gender: reqBody.gender,
        birthday: reqBody.birthday
    }
    try {
        let list = await customerInf.find(
            {
                customer_email:reqBody.customer_email,
                mobile_phone:reqBody.mobile_phone,
            }
        );
        let respon = {};
        if(list && list.length > 0) {
            respon = resdata('9996', '用户已存在',{});
        }else {
            let customerLoginInfo = await customerLogin.create(dataArr);
            await customerAddr.create(Object.assign(dataArr,{"customer_id":customerLoginInfo._id}));
            let newUserInfo = await customerInf.create(Object.assign(dataArr,{"customer_id":customerLoginInfo._id}));
            respon = resdata('0000', '成功', newUserInfo);
        }


        return respon;
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}
exports.findUser = async (reqBody) =>{
    let dataArr = {
        login_name:reqBody.login_name, //用户名
        password: reqBody.password,   //密码
    }
    try {
        let list = await customerLogin.find(dataArr);
        let respon = {};
        if(list && list.length > 0) {
            let customerInfInfo = await customerInf.find({"customer_id":list[0]._id});

            const token = jwt.sign({
                _id: list[0]._id
            }, jwt_token, { expiresIn: '2h' });
            const customerLoginLogInfo = await customerLoginLog.create(Object.assign({"login_type":1,"customer_id":list[0]._id},reqBody))
            respon = resdata('0000', '登录成功',Object.assign(
                {'token':token},
                {'userInfo':{
                    'login_name':list[0].login_name,
                    'mobile_phone':customerInfInfo[0].mobile_phone,
                    'customer_email':customerInfInfo[0].customer_email,
                    'gender':customerInfInfo[0].gender,
                    'user_point':customerInfInfo[0].user_point,
                    'birthday':customerInfInfo[0].birthday,
                    'customer_level':customerInfInfo[0].customer_level,
                    'user_money':customerInfInfo[0].user_money,
                    "login_ip":customerLoginLogInfo.login_ip
                }}
                ));
        }else {
            respon = resdata('9997', '用户不存在', {});
        }

        return respon;
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}
exports.getUserInfo = async (reqBody) =>{
    try {
        let respon = {};
        let customerInfInfo = await customerInf.find({"customer_id":reqBody.id});
        respon = resdata('0000', '成功',customerInfInfo[0])
        return respon;
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}
exports.updateUserInfo = async (reqBody) =>{
    try {
        let respon = {};
        await customerInf.update({customer_id: reqBody.id}, customerInf.ObjKeys(reqBody));
        let customerInfInfoFind = await customerInf.find({customer_id: reqBody.id});
        respon = resdata('0000', '成功',customerInf.ObjKeys(customerInfInfoFind[0]))
        return respon;
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}
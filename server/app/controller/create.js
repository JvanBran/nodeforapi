import { resdata, errdata } from '../../utils/serve'
import { customerInf , customerLogin , customerAddr, customerLevelInf } from '../modal/user'

module.exports = {
    // 注册用户
    createUser : async (reqBody) => {
        let dataArr = {
            login_name:reqBody.mobile_phone,
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
                let newUserInfo = await customerInf.create(Object.assign(dataArr,{"customer_id":customerLoginInfo._id}));
                respon = resdata('0000', '成功', customerInf.ObjKeys(newUserInfo));
            }
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 用户消费变动
    // 用户积分变动
    // 用户登录日志
    // 用户地址添加
    createUserAddr : async (reqBody) =>{
        try {
            let respon = {};
            let list = await customerAddr.create(customerAddr.ObjKeys(Object.assign(reqBody,{'customer_id':reqBody.id})));
            respon = resdata('0000', '成功', customerAddr.ObjKeysNull(list));
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
        
    },
    // 用户级别变动
    createUserLevel : async (reqBody) =>{
        try {
            let respon = {};
            await customerLevelInf.update({customer_id: reqBody.id}, customerLevelInf.ObjKeys(reqBody));
            let customerLevelInfInfoFind = await customerLevelInf.find({customer_id: reqBody.id});
            respon = resdata('0000', '成功',customerLevelInf.ObjKeys(customerLevelInfInfoFind[0]))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    }
}
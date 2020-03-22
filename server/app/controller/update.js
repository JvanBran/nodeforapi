import { resdata, errdata } from '../../utils/serve'
import { customerInf , customerLogin , customerAddr , customerLoginLog , customerConsumptionLog } from '../modal/user'

module.exports = {
    // 更新用户信息
    updateUserInfo : async (reqBody) =>{
        console.log('reqBody: ', reqBody);
        try {
            let respon = {};
            await customerInf.update({'customer_id': reqBody.id}, customerInf.ObjKeys(reqBody));
            let list = await customerInf.find({'customer_id': reqBody.id});
            console.log('list: ', list);

            if(list && list.length > 0){
                respon = resdata('0000', '成功',customerInf.ObjKeysNull(list[0]))
            }else{
                respon = resdata('9997', '用户不存在',{})
            }
            
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 更新用户密码
    updateUserPassword : async (reqBody) =>{
        try {
            let respon = {};
            await customerLogin.update({customer_id: reqBody.id}, customerLogin.ObjKeys(reqBody));
            let customerLoginInfoFind = await customerLogin.find({customer_id: reqBody.id});
            respon = resdata('0000', '成功',customerLogin.ObjKeysNull(customerLoginInfoFind[0]))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 更新用户地址
    updateUserAddr : async (reqBody) =>{
        try {
            let respon = {};
            await customerAddr.update({'_id': reqBody.addr_id,'customer_id': reqBody.id}, customerAddr.ObjKeys(reqBody));
            let list = await customerAddr.find({'_id': reqBody.addr_id,'customer_id': reqBody.id})
            console.log('list: ', list);
            respon = resdata('0000', '成功',customerAddr.ArrKeys(list))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 更新用户积分
    updateUserPoint : async (reqBody) =>{
        try {
            let respon = {};
            await customerLogin.update({customer_id: reqBody.id}, customerLogin.ObjKeys(reqBody));
            let customerLoginInfoFind = await customerLogin.find({customer_id: reqBody.id});
            respon = resdata('0000', '成功',customerLogin.ObjKeysNull(customerLoginInfoFind[0]))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 更新用户余额
    updateUserConsumption : async (reqBody) =>{
        try {
            let respon = {};
            await customerConsumptionLog.update({customer_id: reqBody.id}, customerConsumptionLog.ObjKeys(reqBody));
            let customerConsumptionLogInfoFind = await customerConsumptionLog.find({customer_id: reqBody.id});
            respon = resdata('0000', '成功',customerConsumptionLog.ObjKeysNull(customerConsumptionLogInfoFind[0]))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
}

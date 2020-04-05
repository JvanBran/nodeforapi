import { resdata, errdata } from '../../../utils/serve'
import { systemMuenNavInf } from '../../modal/system'

module.exports = {
    //后台 创建菜单
    createMeunNav : async (reqBody) => {
        try {
            let respon = {};
            let systemMuenNavInfInfo = await systemMuenNavInf.create(systemMuenNavInf.ObjKeys(reqBody));
            respon = resdata('0000', '成功',systemMuenNavInf.ObjKeys(systemMuenNavInfInfo))
            return respon;
        } catch (err) {
            throw new Error(err);s
            return errdata(err);
        }
    },
    // 后台 获取菜单
    getMeunNav : async (reqBody) =>{
        try {
            let respon = {};
            let systemMuenNavInfInfo = await systemMuenNavInf.find({});
            respon = resdata('0000', '成功',systemMuenNavInf.ArrKeys(systemMuenNavInfInfo))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 用户 获取菜单
    getUserMeunNav : async (reqBody) =>{
        try {
            let respon = systemMuenNavInf.ObjKeys(reqBody);
            // console.log(respon);
            let systemMuenNavInfInfo = await systemMuenNavInf.find({});
            respon = resdata('0000', '成功',muenNavInf.ArrKeys(muenNavInfInfo))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    }
}

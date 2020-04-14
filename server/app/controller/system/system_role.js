import { resdata, errdata } from '../../../utils/serve'
import { 
    systemRoleInfo 
} from '../../modal/system'

module.exports = {
    // 获取所有角色
    getRole: async(reqBody) =>{
        try {
            let respon = {};
            let list = await systemRoleInfo.find()
            respon = resdata('0000', '获取成功',systemRoleInfo.ArrKeys(list))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 创建角色
    createRole: async(reqBody) =>{
        try {
            let respon = {};
            let list = await systemRoleInfo.find({role_name:reqBody.role_name})
            if(list && list.length > 0) {
                respon = resdata('9996', '角色名已存在',{});
            }else{
                let systemRoleInfoInfo = await systemRoleInfo.create(systemRoleInfo.ObjKeys(reqBody));
                respon = resdata('0000', '创建成功', systemRoleInfo.ObjKeysNull(systemRoleInfoInfo));
            }
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 修改角色
    updateRole: async(reqBody) =>{
        try {
            let respon = {};
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    }
}

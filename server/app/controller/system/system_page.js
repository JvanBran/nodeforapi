import { resdata, errdata } from '../../../utils/serve'
import { 
    systemPageRole
} from '../../modal/system'

module.exports = {
    // 获取所有菜单
    getMeunNav: async(reqBody) =>{
        try {
            let respon = {};
            let list = await systemPageRole.find()
            respon = resdata('0000', '获取成功',systemPageRole.ArrKeys(list))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 新建菜单
    createMeunNav: async(reqBody) =>{
        try {
            let respon = {};
            let list = await systemPageRole.find({name:reqBody.name})
            if(list && list.length > 0) {
                respon = resdata('9996', '菜单路由名已存在',{});
            }else{
                let systemPageRoleInfo = await systemPageRole.create(systemPageRole.ObjKeys(reqBody));
                respon = resdata('0000', '创建成功', systemPageRole.ObjKeysNull(systemPageRoleInfo));
            }
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 更新菜单
    updateMeunNav: async(reqBody) =>{
        try {
            let respon = {};
            let list = await systemPageRole.find({_id:reqBody._id})
            if(list && list.length > 0) {
                let updateObj = systemPageRole.ObjKeys(reqBody)
                delete updateObj._id
                await systemPageRole.update({_id:reqBody._id},updateObj)
                let list = await systemPageRole.find({_id:reqBody._id})
                respon = resdata('0000', '更新成功',systemPageRole.ArrKeys(list));
            }else{
                respon = resdata('9997', '无次菜单数据', '');
            }
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 获取用户菜单（根据角色）
    getUserMeunNav: async(reqBody) =>{
        try {
            let respon = {};
            //TODO 假设都是管理员 
            let pageList = await systemPageRole.find()
            console.log('pageList: ', pageList);
            respon = resdata('0000', '成功',systemPageRole.ArrKeys(pageList))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    }
}

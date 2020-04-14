import { resdata, errdata } from '../../../utils/serve'
import { customerInf , customerLogin , customerAddr ,customerLoginLog } from '../../modal/user'
import { systemRoleInfo , systemPageRole } from '../../modal/system'
import { paging } from '../util'
import { jwt_token } from '../../../config/serverConfig'
const jwt = require('jsonwebtoken');
module.exports = {
    // 注册用户
    createUser : async (reqBody) => {
        try {
            let list = await customerInf.find(customerInf.ObjKeys(reqBody));
            let respon = {};
            if(list && list.length > 0) {
                respon = resdata('9996', '用户已存在',{});
            }else {
                let customerLoginInfo = await customerLogin.create(customerLogin.ObjKeys(reqBody));
                await customerInf.create(Object.assign(customerInf.ObjKeysNull(reqBody),{"customer_id":customerLoginInfo._id}));
                respon = resdata('0000', '成功', '注册成功');
            }
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 用户登录
    userLogin: async(reqBody)=>{
        try {
            let list = await customerLogin.find(customerLogin.ObjKeys(reqBody));
            let userList = await customerInf.find(customerInf.ObjKeys(reqBody));
            let respon = {};
            if(list && list.length > 0) {
                let customerInfInfo = await customerInf.find({"customer_id":list[0]._id});
                const token = jwt.sign({
                    _id: userList[0].customer_id,
                    user_type: userList[0].user_type,
                    user_role: userList[0].user_role,
                }, jwt_token, { expiresIn: '240h' });
                const customerLoginLogInfo = await customerLoginLog.create(Object.assign({"login_type":1,"customer_id":list[0]._id},reqBody))
                respon = resdata('0000', '登录成功',Object.assign({
                    'token':token,
                    'userInfo':Object.assign(customerInf.ArrKeys(customerInfInfo)[0],{
                        "login_ip":customerLoginLogInfo.login_ip?customerLoginLogInfo.login_ip:reqBody.id,
                    })
                }))
                
            } else if (userList && userList.length > 0){
                respon = resdata('9995', '密码错误', {});
            }else {
                respon = resdata('9997', '用户不存在', {});
            }
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 获取用户信息
    getUserInfo: async (reqBody) =>{
        try {
            let respon = {};
            let list = await customerInf.find({"customer_id":reqBody.id});
            if(list && list.length > 0){
                respon = resdata('0000', '成功',customerInf.ObjKeysNull(list[0]))
            }else{
                respon = resdata('9997', '用户不存在', {});
            }
            
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 获取用户权限
    getUserInfoRole: async (reqBody) =>{
        console.log('reqBody: ', reqBody);
        try {
            let respon = {};
            //TODO 假设都是管理员
            let list = await systemRoleInfo.find({"_id":reqBody.user_role[0]});
            let pageList = await systemPageRole.find()
            let rolePermission = [];
            pageList.map(item=>{
                rolePermission.push({
                    'buttonpermissionList':item.buttonpermissionList,
                    'permission':item.permission,
                    'title':item.title
                })
            })
            if(list && list.length > 0){
                respon = resdata('0000', '成功',rolePermission)
            }else{
                respon = resdata('9997', '角色不存在', {});
            }
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 获取用户列表
    getUserList : async (reqBody) =>{
        let dataArr = customerInf.ObjKeys(reqBody);
        try {
            let respon = {};
            let customerInfInfo = await customerInf.find(dataArr);
            let returnList = paging(Object.assign({
                'totalCount':customerInfInfo.length,
                reqBody,
                'list':customerInfInfo
                })
                );
            returnList.data = customerInf.ArrKeys(returnList.data)
            if(returnList.totalPage >= returnList.pageNo){
                respon = resdata('0000', '成功',returnList)
            }else{
                respon = resdata('9998', '分页参数异常', {});
            }
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 更新用户信息
    updateUserInfo : async (reqBody) =>{
        let dataArr = {
            customer_name:reqBody.customer_name,
            identity_card_type:reqBody.identity_card_type,
            identity_card_no:reqBody.identity_card_no,
            gender:reqBody.gender,
            birthday:reqBody.birthday,
        }
        try {
            let respon = {};
            await customerInf.update({'customer_id': reqBody.id}, dataArr);
            let list = await customerInf.find({'customer_id': reqBody.id});
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
    // 更新用户权限
    updateUserRole : async (reqBody) =>{
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
    // 新增用户地址
    createUserAddr : async (reqBody) =>{
        try {
            let respon = {};
            let list = await navInf.create(navInf.ObjKeys(Object.assign(reqBody,{'customer_id':reqBody.id})));
            respon = resdata('0000', '成功', navInf.ObjKeysNull(list));
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
        
    },
    // 获取用户地址
    getUserAddr : async (reqBody) =>{
        try {
            let respon = {};
            let customerAddrInfo = await customerAddr.find({"customer_id":reqBody.id});
            let returnList = paging(Object.assign({
                'totalCount':customerAddrInfo.length,
                reqBody,
                'list':customerAddrInfo
                })
                );
            returnList.data = customerAddr.ArrKeys(returnList.data)
            console.log('returnList: ', returnList);
            if(returnList.totalPage >= returnList.pageNo){
                respon = resdata('0000', '成功',returnList)
            }else{
                respon = resdata('9998', '分页参数异常', {});
            }


            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 获取用户地址列表
    getUserAddr : async (reqBody) =>{
        try {
            let respon = {};
            let customerAddrInfo = await customerAddr.find({"customer_id":reqBody.id});
            let returnList = paging(Object.assign({
                'totalCount':customerAddrInfo.length,
                reqBody,
                'list':customerAddrInfo
                })
                );
            returnList.data = customerAddr.ArrKeys(returnList.data)
            console.log('returnList: ', returnList);
            if(returnList.totalPage >= returnList.pageNo){
                respon = resdata('0000', '成功',returnList)
            }else{
                respon = resdata('9998', '分页参数异常', {});
            }


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
}
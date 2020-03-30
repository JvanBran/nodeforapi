import { resdata, errdata } from '../../utils/serve'
import { customerInf , customerAddr , customerLoginLog , customerLogin} from '../modal/user'

import { muenNavInf } from '../modal/muennav'

import { paging } from './util'
import { jwt_token } from '../../config/serverConfig'
const jwt = require('jsonwebtoken');

module.exports = {
    /**
     * 获取token/登录
     */
    findUser: async(reqBody)=>{
        let dataArr = {
            login_name:reqBody.login_name, //用户名
            password: reqBody.password,   //密码
        }
        try {
            let list = await customerLogin.find(customerLogin.ObjKeys(dataArr));
            let userList = await customerLogin.find({'login_name':reqBody.login_name});
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
                        'login_name':list[0].login_name?list[0].login_name:'',
                        'mobile_phone':customerInfInfo[0].mobile_phone?customerInfInfo[0].mobile_phone:'',
                        'customer_email':customerInfInfo[0].customer_email?customerInfInfo[0].customer_email:'',
                        'gender':customerInfInfo[0].gender?customerInfInfo[0].gender:'',
                        'user_point':customerInfInfo[0].user_point?customerInfInfo[0].user_point:'',
                        'birthday':customerInfInfo[0].birthday?customerInfInfo[0].birthday:'',
                        'customer_level':customerInfInfo[0].customer_level?customerInfInfo[0].customer_level:'',
                        'user_money':customerInfInfo[0].user_money?customerInfInfo[0].user_money:'',
                        "login_ip":customerLoginLogInfo.login_ip?customerLoginLogInfo.login_ip:''
                    }}
                    ));
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
    /**
     * [getUserInfo description] 获取用户详情
     */
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
    /**
     * 获取用户地址
     *
     * @return  {[type]}  [return description]
     */ 
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
            console.log('returnList: ', returnList);
            if(returnList.totalPage > returnList.pageNo){
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
    // 后台 获取菜单
    getMeunNav : async (reqBody) =>{
        try {
            let respon = {};
            let muenNavInfInfo = await muenNavInf.find({});
            respon = resdata('0000', '成功',muenNavInf.ArrKeys(muenNavInfInfo))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    },
    // 用户 获取菜单
    getUserMeunNav : async (reqBody) =>{
        try {
            let respon = muenNavInf.ObjKeys(reqBody);
            // console.log(respon);
            let muenNavInfInfo = await muenNavInf.find({});
            respon = resdata('0000', '成功',muenNavInf.ArrKeys(muenNavInfInfo))
            return respon;
        } catch (err) {
            throw new Error(err);
            return errdata(err);
        }
    }
}

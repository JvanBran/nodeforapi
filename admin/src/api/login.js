import { post , get } from "@/util/axios"
/**
 *
 * @api {get} /v1/ues/:sn/rt-info 获取设备上报实时信息
 * @apiVersion 1.0.0
 * @apiName GetUeRealTimeInfo
 * @apiGroup UE
 * 
 * @apiParam {String} sn 设备序列号
 * 
 * @apiSuccess {String} sn 设备序列号
 * @apiSuccess {Number} status 设备状态
 * @apiSuccess {Number} soc 电池电量百分比
 * @apiSuccess {Number} voltage 电池电压
 * @apiSuccess {Number} current 电池电流
 * @apiSuccess {Number} temperature 电池温度
 * @apiSuccess {String} reportTime 上报时间(yyyy-MM-dd HH:mm:ss)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "sn": "P000000000",
 *       "status": 0,
 *       "soc": 80,
 *       "voltage": 60.0,
 *       "current": 10.0,
 *       "temperature": null,
 *       "reportTime": "2018-08-13 18:11:00"
 *     }
 *
 */
const login = async (params) => {
    return post("/api/public/user/signin", params);
}
const userInfoRole = async (params) =>{
    return get("/api/public/user/userInfoRole", params);
}
const getCurrentUserNav = async (params) =>{
    return get("/api/admin/system/usermeunlist", params);
}
export{
    login,
    userInfoRole,
    getCurrentUserNav
}
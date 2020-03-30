import { post , get } from "@/util/axios"
//登录
const creatMeunNav = async (params) =>{
    return post("/api/admin/createMeunNav", params);
}
const getMeunNav = async (params) =>{
    return get("/api/admin/getMeunNav", params);
}
export{
    getMeunNav,
    creatMeunNav
}
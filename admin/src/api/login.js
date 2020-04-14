import { post , get } from "@/util/axios"
//登录
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
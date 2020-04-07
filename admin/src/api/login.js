import { post , get } from "@/util/axios"
//登录
const login = async (params) => {
    return post("/api/public/user/signin", params);
}
const getInfo = async (params) =>{
    return get("/api/users/info", params);
}
const getCurrentUserNav = async (params) =>{
    return get("/api/users/nav", params);
}
export{
    login,
    getInfo,
    getCurrentUserNav
}
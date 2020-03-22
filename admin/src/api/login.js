import { post } from "@/util/axios"
//登录
const login = async (params) => {
    return post("/api/login/signin", params);
}
export{
    login
}
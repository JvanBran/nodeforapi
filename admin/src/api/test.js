import { get } from "@/util/axios"

const getTestImg = async (params) =>{
    return get("/api/public/user/testimg", params);
}
export{
    getTestImg
}
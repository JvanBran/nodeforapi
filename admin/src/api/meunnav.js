import { post , get, patch } from "@/util/axios"

const getMeunNav = async (params) =>{
    return get("/api/admin/system/meunlist", params);
}
const editMeunNav = async (params) =>{
    return patch("/api/admin/system/meunlist", params);
}
const creatMeunNav = async (params) =>{
    return post("/api/admin/system/meunlist", params);
}

export{
    getMeunNav,
    editMeunNav,
    creatMeunNav
}
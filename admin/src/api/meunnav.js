import { post , get } from "@/util/axios"

const getMeunNav = async (params) =>{
    return get("/api/admin/system/meunlist", params);
}

const creatMeunNav = async (params) =>{
    return post("/api/admin/createMeunNav", params);
}

export{
    getMeunNav,
    creatMeunNav
}
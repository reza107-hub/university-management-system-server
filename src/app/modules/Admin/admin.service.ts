import Admin from "./admin.model";


const getAdminListFromDB = async()=>{
    const result = await Admin.find();
    return result
}

export const AdminService = {
    getAdminListFromDB
}
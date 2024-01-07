import { ObjectId } from "mongodb"
import User from "./user.model"
import Admin from "../Admin/admin.model"
import { TAdmin } from "../Admin/admin.interface"
import { TUser } from "./user.interface"
import AppError from "../../error/AppError"
import httpStatus from "http-status"



const createUserIntoDB = async (user:TUser) => {
    const query = { email: user.email }
    const existingUser = await User.findOne(query);
    if (existingUser) {
        throw new AppError(httpStatus.FORBIDDEN,'User Already exists')
    }
    const result = await User.create(user)
    return(result)
}

const getUsersFromDB = async () => {
    const result = await User.find()
    return result
}


const getIsUserAdminOrNotFromDB = async (email: string) => {
    const query = { email: email }
    const user = await User.findOne(query);
    const result = { admin: user?.role === 'admin' }
    return result
}

const makeStudentIntoDB = async (id: string) => {
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
        $set: {
            role: 'student',
        },
    };
    const result = await User.findByIdAndUpdate(filter, updateDoc);
    return result
}


const makingAdminIntoDB = async (body: TAdmin, id: string) => {
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
        $set: {
            role: 'admin'
        },
    };

    const result = await User.updateOne(filter, updateDoc);

    if (result.modifiedCount === 1) {
        const adminResult = await Admin.create(body);
        return (adminResult);
    } else {
        return (result);
    }
}

const removeAdminFromDB = async (id: string) => {

    const filter = { _id: new ObjectId(id) };
    const deleteFilter = { userId: id };
    const updateDoc = {
        $set: {
            role: 'user'
        },
    };

    const result = await User.updateOne(filter, updateDoc);

    if (result.modifiedCount === 1) {
        const adminResult = await Admin.deleteOne(deleteFilter)
        return (adminResult);
    } else {
        return (result);
    }

}


export const userService = {
    getUsersFromDB,
    getIsUserAdminOrNotFromDB,
    makeStudentIntoDB,
    makingAdminIntoDB,
    removeAdminFromDB,
    createUserIntoDB
}
import { ObjectId } from "mongodb"
import User from "./user.model"
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




export const userService = {
    getUsersFromDB,
    makeStudentIntoDB,
    createUserIntoDB
}
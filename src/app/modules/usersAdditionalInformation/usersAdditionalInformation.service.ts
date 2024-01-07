import { ObjectId } from "mongodb"
import User from "../User/user.model"
import { TUserAdditionalInformation } from "./usersAdditionalInformation.interface"
import UserAdditionalInformationModel from "./usersAdditionalInformation.model"
import AppError from "../../error/AppError"
import httpStatus from "http-status"


const getIsUserHasAdditionalInformationFromDB = async () => {
    const result = await UserAdditionalInformationModel.find()
    return result
}

const postUserAdditionalInformationIntoDB = async (data:TUserAdditionalInformation) => {
    const existingData = await UserAdditionalInformationModel.findOne({ email: data.email })
    if (existingData) {
        throw new AppError(httpStatus.FORBIDDEN,'Already Exists')
    }
    const result = await UserAdditionalInformationModel.create(data)
  

    const filter = { _id: new ObjectId(data.userId) };
    const updateDoc = {
        $set: {
            hasAdditionalInfo: true
        },
    };
    await User.updateOne(filter, updateDoc)
    return result
}

export const usersAdditionalInformationService = {
    getIsUserHasAdditionalInformationFromDB,
    postUserAdditionalInformationIntoDB
}
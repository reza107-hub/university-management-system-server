import httpStatus from "http-status";
import AppError from "../../error/AppError";
import Program from "./program.model"
import { TProgram } from "./Program.interface";

const createProgramIntoDB = async(payload:TProgram)=>{
    const {name} = payload
    const existingProgram = await Program.findOne({name});
    if (existingProgram) {
        throw new AppError(httpStatus.FORBIDDEN,'Program Already exists')
    }
    const result = await Program.create(payload)
    return result
}

const getAllProgramsFromDB = async()=>{
    const result = await Program.find()
    return result
}

export const programServices = {
    createProgramIntoDB,
    getAllProgramsFromDB
}
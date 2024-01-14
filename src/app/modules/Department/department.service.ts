import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TDepartment } from "./department.interface";
import Department from "./department.model";
import Program from "../Program/program.model";
import { ObjectId } from "mongodb";




const createDepartmentIntoDB = async (payload:TDepartment)=>{
    const {name,program} = payload
    const existingDepartment = await Department.findOne({name});
    if (existingDepartment) {
        throw new AppError(httpStatus.FORBIDDEN,'Department Already exists')
    }
    const isProgramExists = await Program.findById({_id:new ObjectId(program)})
    if (!isProgramExists) {
        throw new AppError(httpStatus.FORBIDDEN,'Program does not exist')
    }    
    const result = await Department.create(payload)
    return result
}

export const departmentServices = {
    createDepartmentIntoDB
}
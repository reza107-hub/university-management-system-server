import { Types } from "mongoose";


export type TDepartment = {
    name: string;
    shortForm: string;
    code: string;
    program:Types.ObjectId
}
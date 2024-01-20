import httpStatus from "http-status";
import AppError from "../../error/AppError";

import { TBatch} from "./batch.interface";
import Batch from "./batch.model";

const createBatchIntoDB = async (payload: TBatch) => {
    const { batchNumber } = payload
    const existingBatch = await Batch.findOne({ batchNumber });
    if (existingBatch) {
        throw new AppError(httpStatus.FORBIDDEN, 'batch Already exists')
    }
    const result = await Batch.create(payload)
    return result
}

const getAllBatchFromDB = async () => {
    const result = await Batch.find()
    return result
}

export const BatchServices = {
    createBatchIntoDB,
    getAllBatchFromDB
}
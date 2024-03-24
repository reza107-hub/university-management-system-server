import httpStatus from 'http-status';
import AppError from '../../error/AppError';

import { TBatch } from './batch.interface';
import Batch, { SectionModel } from './batch.model';

const createBatchIntoDB = async (payload: TBatch) => {
  const { batchNumber } = payload;
  const existingBatch = await Batch.findOne({ batchNumber });
  if (existingBatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'batch Already exists');
  }
  const result = await Batch.create(payload);
  if (result){
    const data = {
      batchId: result._id,
      name: batchNumber.toString()
    };
    await SectionModel.create(data)
  }
  return result;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateBatchIntoDB = async (_id: any, payload: TBatch) => {
  const result = await Batch.findByIdAndUpdate({ _id }, payload, { new: true });

  // Checking if the flower does not exist or is deleted
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Batch not found or is deleted');
  }

  return result;
};

const getAllBatchFromDB = async () => {
  const result = await Batch.find().populate('deptId');
  return result;
};

const getAllSectionFromDB = async () => {
  const result = await SectionModel.find().populate({
    path: 'batchId',
    populate: {
      path: 'deptId',
      model: 'department',
    },
  });
  return result;
};

export const BatchServices = {
  createBatchIntoDB,
  getAllBatchFromDB,
  updateBatchIntoDB,
  getAllSectionFromDB,
};

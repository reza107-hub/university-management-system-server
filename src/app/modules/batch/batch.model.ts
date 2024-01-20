import mongoose, { Schema } from "mongoose";
import { TBatch } from "./batch.interface";



const batchSchema = new Schema<TBatch>(
    {
        batchNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        isAdmissionGoing:{
            type: Boolean,
            required: true,
            default: false,
        }
    },
    {
        timestamps: true,
    },
)


const Batch = mongoose.model<TBatch>('batch', batchSchema);
export default Batch;
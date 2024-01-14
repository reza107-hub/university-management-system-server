import mongoose, { Schema } from "mongoose";
import { TProgram } from "./Program.interface";


const programSchema = new Schema<TProgram>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    },
)


const Program = mongoose.model<TProgram>('program', programSchema);
export default Program;
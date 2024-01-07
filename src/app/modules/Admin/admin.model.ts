import mongoose, { Schema } from "mongoose";
import { TAdmin } from "./admin.interface";


const adminSchema = new Schema<TAdmin>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        image: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
        presentAddress: {
            type: String,
            required: true,
        },
        permanentAddress: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.model<TAdmin>('TStudent', adminSchema);

export default Admin;
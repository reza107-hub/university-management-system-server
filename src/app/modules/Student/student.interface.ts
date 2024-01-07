import { Types } from "mongoose";

export type TStudent = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    name: {
        firstName: string;
        lastName: string;
    };
    father: {
        name: string;
        occupation: string;
    };
    mother: {
        name: string;
        occupation: string;
    };
    presentGuardian: {
        name: string;
        contact: string;
    }
    dateOfBirth: string;
    gender: string;
    contactNumber: string;
    email: string;
    presentAddress: string;
    permanentAddress: string;
    bloodGroup: string;
    age: string;
    programme: string;
    department: string;
    batchNumber: number;
    nationality: string;
    yearOfRegistration: string;
    image: string;
    sscCertificate: string;
    hscCertificate: string;
    createdAt: string;
    updatedAt: string;
    userId: Types.ObjectId;
    studentId: string;
}

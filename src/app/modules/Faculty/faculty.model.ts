import mongoose, { Schema } from 'mongoose';
import { TFaculty } from './faculty.interface';

const facultySchema = new Schema<TFaculty>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    userAdditionalInfoId:{
      type: Schema.Types.ObjectId,
      ref:'usersAdditionalInformation'
    },
    departmentId:{
      type: Schema.Types.ObjectId,
      ref:'department'
    },
    designation:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  },
);

const Faculty = mongoose.model<TFaculty>('faculty', facultySchema);

export default Faculty;

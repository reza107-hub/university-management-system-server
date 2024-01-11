import { Schema, model } from 'mongoose';
import { TUserAdditionalInformation } from './usersAdditionalInformation.interface';

const userAdditionalInformationSchema = new Schema<TUserAdditionalInformation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    contactNumber: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const usersAdditionalInformationModel = model<TUserAdditionalInformation>(
  'usersAdditionalInformation',
  userAdditionalInformationSchema,
);

export default usersAdditionalInformationModel;

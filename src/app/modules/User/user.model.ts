import mongoose, { Schema} from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },

    hasAdditionalInfo: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

  const User = mongoose.model<TUser>('user', userSchema);
  //usersCollection

  export default User;
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
      isDeleted: {
        type: Boolean,
        default: false,
      },
      hasAdditionalInfo: {
        type: Boolean,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  const User = mongoose.model<TUser>('user', userSchema);
  //usersCollection
  
  export default User;
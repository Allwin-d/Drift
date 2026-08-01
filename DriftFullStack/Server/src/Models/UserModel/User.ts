import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxLength: [100, "Name Should be within 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    maxLength: [254, "Email should be within 254 characters"],
  },
  passwordHash: {
    type: String,
    required: [true, "Password is required"],
    minLength : [8,"Password should be at least 8 characters"],
    maxLength: [255, "Password should be within 255 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;

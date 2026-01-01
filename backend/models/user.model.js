import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    isVerified: { type: Boolean, default: false },
    otp: String,          // 6-digit code yahan save hoga
    otpExpires: Date      // OTP kab expire hoga
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
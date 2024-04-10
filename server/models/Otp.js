import mongoose from "mongoose";
const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    otp: {
      type: String,
      required: [true, "OTP is required"],
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "10min" },
    },
  },
  {
    timestamps: true,
  }
);
const Otp = mongoose.model("Otp", otpSchema);
export default Otp;

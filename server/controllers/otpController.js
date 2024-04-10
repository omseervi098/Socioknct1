import otpGenerator from "otp-generator";
import Otp from "../models/Otp.js";
import User from "../models/User.js";
import verifyemail from "../Mailer/verifyemail_mailer.js";
export const sendOTP = async (req, res) => {
  try {
    const { email, name } = req.body;
    console.log(email, name);
    // Check if user is already present
    const checkUserPresent = await User.findOne({ email: email });
    // If user found with provided email
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // find recent otp of given mail and ensure 30 seconds have passed
    let result1 = await Otp.findOne({ email: email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (result1) {
      const now = new Date();
      const diff = now - result1.createdAt;
      const seconds = Math.floor(diff / 1000);
      if (seconds < 30) {
        return res.status(429).json({
          success: false,
          message: "Please wait before sending OTP",
        });
      }
    }
    let result = await Otp.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await Otp.findOne({ otp: otp });
    }
    const otpPayload = { email: email, otp, valid: true };
    const otpBody = await Otp.create(otpPayload);
    // Send OTP to user
    const user = { email, name };
    const info = await verifyemail(user, otp);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";

// Function to generate a random 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000);

// Function to create a Nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    // secure: false, // Use `true` for port 465, `false` for other ports (587 for TLS)
    auth: {
      user: "jay439363@gmail.com", // Your Gmail address
      pass: "lwoxlcjtbmewosnc", // Your app password
      // pass: "QWERTYUIOPpo", // Your app password
    },
  });
};

// Function to send OTP via email
const sendOTPByEmail = async (email, otp) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"INSTO Education" <jay439363@gmail.com>`, // Your Gmail address
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("email sent ");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new ApiError(500, "Failed to send OTP email");
  }
};

// Variable to store OTP globally
let otp = "";

// Controller function to check user and send OTP
const checkUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "No email provided");
  }

  const user = await User.findOne({
    where: { email },
    attributes: { exclude: ["password", "refreshToken"] },
  });

  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  otp = generateOTP();

  console.log(otp);

  try {
    await sendOTPByEmail(email, otp);
    res
      .status(200)
      .json(new ApiResponse(200, { email, otp }, "OTP sent successfully"));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { getOtp } = req.body;

  console.log("this is getOtp:", getOtp);
  console.log("this is OTP", otp);

  if (!getOtp) {
    throw new ApiError(400, "No OTP sent");
  }

  if (parseInt(getOtp) !== parseInt(otp)) {
    throw new ApiError(403, "Wrong OTP");
  }
  

  res.status(200).json(new ApiResponse(200, true, "OTP verified successfully"));
});

export { checkUser, verifyOtp };

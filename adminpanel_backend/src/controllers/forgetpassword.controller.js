import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";

// Function to generate a random 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

// Function to send OTP via email
const sendOTPByEmail = async (email, otp) => {
  console.log("I am here ");
  // Create a Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "jay439363@gmail.com",
      pass: "QWERTYUIOPpo",
    },
  });

  // Send mail with defined transport object
  await transporter.sendMail({
    from: '"INSTO Education" <jay439363@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "OTP Verification", // Subject line
    text: `Your OTP for verification is: ${otp}`,
  });
};

const checkUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "No email provided");
  }

  const user = await User.findOne({
    where: { email }, // Assuming user.id is the newly created user's id
    attributes: { exclude: ["password", "refreshToken"] },
  });

  if (!user) {
    throw new ApiError(404, "User not found with this email");
  }

  console.log(user);

  // Generate a 4-digit OTP
  const otp = generateOTP();

  console.log(otp);

  // Send OTP to the user's email
  //   await sendOTPByEmail(email, otp);

  try {

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "faltumeramail@gmail.com",
          pass: "QWERTYUIOP@12",
        },
      });


    const mailOptions = {
      from: "faltumeramail@gmail.com",
      to: email,
      subject: `RESET PASSWORD`,
      html: `<h1>OTP is ${otp}</h1>`,
    };

    
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("ERROR", err);
      } else {
        console.log("EMAIL SEND" + info.response);
        return res.status(200).send(`OTP SENDED SUCCESSFULLY`);
      }
    });


    
  } catch (er) {
    return res.status(404).send(er.message);
  }

  // Respond with success message
//   res.status(200).json({
//     success: true,
//     message: "OTP sent successfully",
//     data: {
//       email,
//       otp, // For testing purposes, you might want to remove this in production
//     },
//   });
});

export { checkUser };

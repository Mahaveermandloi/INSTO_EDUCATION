import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import nodemailer from "nodemailer";

const generateNewToken = asyncHandler(async (req, res) => {
  
     

});


export {generateNewToken};


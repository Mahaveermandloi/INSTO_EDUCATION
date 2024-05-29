import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Fetching token
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // console.log(token);

    if (!token) {
      throw new ApiError(401, "Unauthorized token");
    }

    // Decoding token
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Getting user
    const user = await User.findOne({
      where: { id: decodedToken.id },
      attributes: { exclude: ["password", "refreshToken"] },
    });

    if (!user) {
      throw new ApiError(401, "Invalid token Access");
    }

    // Set the user to req.user such that it can be accessed anywhere
    req.user = user;

    // Calling next if middleware passed
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

// import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";

import {
 
  uploadSchoolInfo,
  deleteSchoolInfo,
 
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
// creating a router

const router = Router();
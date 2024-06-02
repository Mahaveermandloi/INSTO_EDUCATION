// import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";

import {
 
} from "../controllers/user.controller.js";


import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
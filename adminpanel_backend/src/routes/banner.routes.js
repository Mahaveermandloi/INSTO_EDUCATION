// import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";

import {

  showBanner,
  deleteBannerImage,
  uploadBannerImage,
 
} from "../controllers/user.controller.js";


import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { generateNewToken } from "../controllers/generatenewtoken.controller.js";
// creating a router


const router = Router();


// http://localhost:8000/api/v1/home/postBanner


router.route("/show-banner").get(verifyJWT, showBanner);

router
  .route("/upload-banner-image")
  .post(verifyJWT, upload.single("image"), uploadBannerImage);

router.route("/delete-banner-image/:id").delete(verifyJWT, deleteBannerImage);

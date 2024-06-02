// import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";

import {
  uploadImage,
  showGallery,
  deleteImage,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/show-gallery").get(verifyJWT, showGallery);

router
  .route("/upload-image")
  .post(verifyJWT, upload.single("image"), uploadImage);

router.route("/delete-image/:id").delete(verifyJWT, deleteImage);

// import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";

import {
 
  uploadFreeContentImage,
  deleteFreeContentImage,
  uploadFreeContentVideo,
  deleteFreeContentVideo,
  deleteFreeContentPdf,
  uploadFreeContentPdf,
 
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();


// // FREE
router
  .route("/upload-free-image")
  .post(verifyJWT, upload.single("image"), uploadFreeContentImage);

router
  .route("/delete-free-image/:id")
  .delete(verifyJWT, deleteFreeContentImage);

router
  .route("/upload-free-video")
  .post(verifyJWT, upload.single("video"), uploadFreeContentVideo);

router
  .route("/delete-free-video/:id")
  .delete(verifyJWT, deleteFreeContentVideo);

router
  .route("/upload-free-pdf")
  .post(verifyJWT, upload.single("pdf"), uploadFreeContentPdf);

router.route("/delete-free-pdf/:id").delete(verifyJWT, deleteFreeContentPdf);

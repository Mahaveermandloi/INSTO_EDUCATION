// import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";

import {
 
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();


router.route("/show-news-and-blogs").get(verifyJWT, getNewsAndBlogs);

router
  .route("/upload-news-and-blogs")
  .post(verifyJWT, upload.single("image"), uploadNewsAndBlogs);

router
  .route("/delete-news-and-blogs/:id")
  .delete(verifyJWT, deleteNewsAndBlogs);
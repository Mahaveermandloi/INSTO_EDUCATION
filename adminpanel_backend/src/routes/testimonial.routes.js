// import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";

import {
  uploadTestimonials,
  getTestimonials,
  deleteTestimonials,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/show-testimonials").get(verifyJWT, getTestimonials);

router
  .route("/upload-testimonials")
  .post(verifyJWT, upload.single("image"), uploadTestimonials);

router.route("/delete-testimonials/:id").delete(verifyJWT, deleteTestimonials);
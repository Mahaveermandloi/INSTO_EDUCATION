// import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";

import {} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
// creating a router

const router = Router();

router
  .route("/upload-student-info")
  .post(verifyJWT, upload.single("excel_file"), uploadStudent);

// router.route("/delete-testimonials/:id").delete(verifyJWT, deleteTestimonials);

// import { verifyJWT } from "../middlewares/auth.middleware";
import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  showDashboardDetails,
  uploadImage,
  showGallery,
  deleteImage,
  uploadFreeContentImage,
  deleteFreeContentImage,
  uploadFreeContentVideo,
  deleteFreeContentVideo,
  deleteFreeContentPdf,
  uploadFreeContentPdf,
  uploadSchoolInfo,
  deleteSchoolInfo,
  uploadNewsAndBlogs,
  deleteNewsAndBlogs,
  uploadTestimonials,
  getTestimonials,
  uploadStudent,
  deleteTestimonials,
  showProfile,
  getContent,
  getSchoolInfo,
  showBanner,
  deleteBannerImage,
  uploadBannerImage,
  getNewsAndBlogs,
  updateProfile,
  updatePassword,
} from "../controllers/user.controller.js";
import {
  checkUser,
  verifyOtp,
  verifyToken,
  updateNewPassword,
} from "../controllers/forgetpassword.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { generateNewToken } from "../controllers/generatenewtoken.controller.js";
// creating a router

const router = Router();

// router.route("/route").httpMethod(middleware1 , middleware2 ,middleware3 ,controllerFunc)

// SIGNUP
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

router
  .route("/update-profile")
  .put(verifyJWT, upload.single("image"), updateProfile);

router.route("/profile").get(verifyJWT, showProfile);
router.route("/content").get(verifyJWT, getContent);

router.route("/update-password").put(verifyJWT, updatePassword);

router.route("/update-new-password").put(updateNewPassword);

router.route("/check-user").post(checkUser);

router.route("/verify-otp").post(verifyOtp);

router.route("/verify-token").post(verifyToken);

// router.route("/generate-new-token").post(generateNewToken);

// // LOGIN
// router.route("/login").post(loginUser);

// // DASHBOARD
// router.route("/dashboard").post(verifyJWT, showDashboardDetails);

// // -----------------GALLERY--------------------------------------------------
router.route("/show-gallery").get(verifyJWT, showGallery);

router
  .route("/upload-image")
  .post(verifyJWT, upload.single("image"), uploadImage);

router.route("/delete-image/:id").delete(verifyJWT, deleteImage);

// -----------------------------BANNER =-----------------------------------------

router.route("/show-banner").get(verifyJWT, showBanner);

router
  .route("/upload-banner-image")
  .post(verifyJWT, upload.single("image"), uploadBannerImage);

router.route("/delete-banner-image/:id").delete(verifyJWT, deleteBannerImage);

// // --------------CONTENT------------------------------------------------------

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

// ------------------------------SCHOOL INFO ---------------------------------------
router
  .route("/upload-school-info")
  .post(verifyJWT, upload.single("logo"), uploadSchoolInfo);

router.route("/delete-school-info/:id").delete(verifyJWT, deleteSchoolInfo);

router.route("/get-school-info").get(verifyJWT, getSchoolInfo);

//--------------------------------------NEWS AND BLOGS---------------------------------
router.route("/show-news-and-blogs").get(verifyJWT, getNewsAndBlogs);

router
  .route("/upload-news-and-blogs")
  .post(verifyJWT, upload.single("image"), uploadNewsAndBlogs);

router
  .route("/delete-news-and-blogs/:id")
  .delete(verifyJWT, deleteNewsAndBlogs);

// ----------------------TESTIMONIALS ------------------------------------------------
router.route("/show-testimonials").get(verifyJWT, getTestimonials);

router
  .route("/upload-testimonials")
  .post(verifyJWT, upload.single("image"), uploadTestimonials);

router.route("/delete-testimonials/:id").delete(verifyJWT, deleteTestimonials);

// ----------------------STUDENTS ------------------------------------------------

router
  .route("/upload-student-info")
  .post(verifyJWT, upload.single("excel_file"), uploadStudent);

// router.route("/delete-testimonials/:id").delete(verifyJWT, deleteTestimonials);

export default router;

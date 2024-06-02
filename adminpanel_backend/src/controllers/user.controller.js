import {
  ImageContent,
  PdfContent,
  VideoContent,
} from "../models/content.model.js";
import Gallery from "../models/gallery.model.js";
import Banner from "../models/banner.model.js";
import School from "../models/school.model.js";
import User from "../models/user.model.js"; // Import the default export
import News from "../models/news.model.js";
import Testimonial from "../models/testimonial.model.js";
import Student from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { Op } from "sequelize";



import bcrypt from "bcrypt";

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log(email, name, password);

  if ([email, name, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user with the same email or name already exists
  const existedUser = await User.findOne({
    where: {
      [Op.or]: [{ name: name }, { email: email }],
    },
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const randomId = Math.floor(Math.random() * 1000000);

  const user = await User.create({
    id: randomId,
    image: "null",
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: password.toLowerCase(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const createdUser = await User.findOne({
    where: { id: user.id }, // Assuming user.id is the newly created user's id
    attributes: { exclude: ["password", "refreshToken"] },
  });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  // console.log(user.password);
  // console.log(password);

  // console.log(isPasswordValid);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await user.generateAndSaveTokens();

  const loggedInUser = await User.findOne({
    where: { id: user.id },
    attributes: { exclude: ["password", "refreshToken"] },
  });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

// LOGOUT
const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  console.log(userId);
  // Ensure the user is found and their refresh token is unset

  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await user.update({ refreshToken: null });

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const { oldPassword, newPassword } = req.body;

  // Log the passwords for debugging
  console.log("Old Password:", oldPassword);
  console.log("New Password:", newPassword);

  // Ensure passwords are provided
  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
  }

  // Find the user by ID
  const user = await User.findByPk(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Compare the provided current password with the user's actual password
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordCorrect) {
    throw new ApiError(403, "Current password is incorrect");
  }

  // Hash the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password in the database
  await user.update({ password: hashedNewPassword });

  // Respond with success message
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// DASHBOARD ---> show dashdetails
const showDashboardDetails = asyncHandler(async (req, res) => {});

// ----------------------------------------------------------------------------------------------------------------
// UPLOAD IMAGES IN GALLERY

const showGallery = asyncHandler(async (req, res) => {
  // Fetch all gallery entries from the database
  const galleryEntries = await Gallery.findAll();

  res.status(200).json(new ApiResponse(200, { galleryEntries }, "Image List"));
  // .json(new ApiResponse(200, { images: imageUrls }, "Image List"));
});

const uploadImage = asyncHandler(async (req, res) => {
  const galleryImage = req.file;

  if (!galleryImage) {
    throw new ApiError(403, "Image not available");
  }

  // const newEntry = await Gallery.create({
  //   image: `/temp/${galleryImage.originalname}`, // Store the relative path
  //   id: randomId,
  //   timestamp: new Date(),
  // });

  const newEntry = await Gallery.create({
    image: `/temp/${galleryImage.originalname}`, // Store the relative path
    caption: req.body.caption || null, // Optionally add a caption
  });

  if (!newEntry) {
    throw new ApiError(400, "Error while uploading the image");
  }
  

  return res
    .status(200)
    .json(new ApiResponse(200, newEntry, "Image Uploaded Successfully"));
});

const deleteImage = asyncHandler(async (req, res) => {
  const id = req.params.id; // Use req.params.id to access route parameters

  console.log(id);

  if (!id) {
    throw new ApiError(403, "Image not found");
  }

  const isDeleted = await Gallery.destroy({
    where: {
      id: id,
    },
  });

  if (!isDeleted) {
    throw new ApiError(403, "Facing some issue deleting this image");
  }

  res.status(200).json(new ApiResponse(200, {}, "Image deleted successfully"));
});

// ---------------------BANNER ---------------------------------------------------
const showBanner = asyncHandler(async (req, res) => {
  // Fetch all gallery entries from the database
  const galleryEntries = await Banner.findAll();

  // Extract image URLs from gallery entries
  // const imageUrls = galleryEntries.map((entry) => `/images/${entry.image}`);

  // console.log(imageUrls);

  res.status(200).json(new ApiResponse(200, { galleryEntries }, "Image List"));
  // .json(new ApiResponse(200, { images: imageUrls }, "Image List"));
});

const uploadBannerImage = asyncHandler(async (req, res) => {
  const galleryImage = req.file;

  if (!galleryImage) {
    throw new ApiError(403, "Image not available");
  }

  const randomId = Math.floor(Math.random() * 1000000);

  const newEntry = await Banner.create({
    image: `/temp/${galleryImage.originalname}`, // Store the relative path
    id: randomId,
    timestamp: new Date(),
  });

  if (!newEntry) {
    throw new ApiError(400, "Error while uploading the image");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newEntry, "Image Uploaded Successfully"));
});

const deleteBannerImage = asyncHandler(async (req, res) => {
  const id = req.params.id; // Use req.params.id to access route parameters

  console.log(id);

  if (!id) {
    throw new ApiError(403, "Image not found");
  }

  const isDeleted = await Banner.destroy({
    where: {
      id: id,
    },
  });

  if (!isDeleted) {
    throw new ApiError(403, "Facing some issue deleting this image");
  }

  res.status(200).json(new ApiResponse(200, {}, "Image deleted successfully"));
});

// ---------------------------------------------------------------------------------------
// GET PROFILE DATA

const showProfile = asyncHandler(async (req, res) => {
  // const { name, email, number } = req.user;

  const data = req.user;
  console.log(data);

  res.status(200).json(new ApiResponse(200, { data }, "Profile"));
});

const updateProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.user;
    const { name, email, number } = req.body;
    const profileImage = req.file;

    let imagePath = "";
    console.log(profileImage);

    if (profileImage) {
      imagePath = `/temp/${profileImage.originalname}`;
    }

    const user = await User.findByPk(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (name) user.name = name.toLowerCase();
    if (email) user.email = email.toLowerCase();
    if (number) user.number = number;
    if (imagePath) user.image = imagePath;

    await user.save();

    const updatedUser = await User.findOne({
      where: { id: user.id },
      attributes: { exclude: ["password", "refreshToken"] },
    });

    if (!updatedUser) {
      throw new ApiError(404, "Failed to retrieve updated user data");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedUser, "User profile updated successfully")
      );
  } catch (error) {
    console.error("Error updating user profile:", error);
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
});

// ---------------------------------------------------------------------------------------

const getContent = asyncHandler(async (req, res) => {
  const imageData = await ImageContent.findAll();
  const videoData = await VideoContent.findAll();
  const pdfData = await PdfContent.findAll();

  console.log(imageData, videoData, pdfData);

  if (!imageData || !videoData || !pdfData) {
    throw ApiError(403, "Some error occurred while fetching the data");
  }

  const combinedData = {
    images: imageData,
    videos: videoData,
    pdfs: pdfData,
  };

  res
    .status(200)
    .json(new ApiResponse(200, combinedData, "Content retrieved successfully"));
});

// -----------------------------------------------------
const uploadFreeContentImage = asyncHandler(async (req, res) => {
  const imageContent = req.file;

  console.log(imageContent);
  if (!imageContent) {
    throw new ApiError(403, "Image not available");
  }

  const randomId = Math.floor(Math.random() * 1000000);

  const newEntry = await ImageContent.create({
    id: randomId,
    image: `/temp/${imageContent.originalname}`,
    is_paid: false,
    timestamp: new Date(),
  });

  if (!newEntry) {
    throw new ApiError(400, "Error while uploading the image");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, newEntry, "Free Image Content Uploaded Successfully")
    );
});

const deleteFreeContentImage = asyncHandler(async (req, res) => {
  const id = req.params.id; // Use req.params.id to access route parameters

  console.log(id);

  if (!id) {
    throw new ApiError(403, "Image not found");
  }

  const isDeleted = await ImageContent.destroy({
    where: {
      id: id,
    },
  });

  if (!isDeleted) {
    throw new ApiError(403, "Facing some issue deleting this image");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Free Image Content deleted successfully"));
});

// ------------------------------------------==================================

const uploadFreeContentVideo = asyncHandler(async (req, res) => {
  const { file } = req;

  if (!file) {
    throw new ApiError(403, "video file not available");
  }

  console.log(file);

  const randomId = Math.floor(Math.random() * 1000000);

  const video = await VideoContent.create({
    id: randomId,
    video: `/temp/${file.originalname}`,
    is_paid: false,
    timestamp: new Date(),
  });

  if (!video) {
    throw new ApiError(403, "error while uploading video");
  }

  res
    .status(200)
    .json(new ApiResponse(200, video, "Video uploaded successfully "));
});

const deleteFreeContentVideo = asyncHandler(async (req, res) => {
  const id = req.params.id; // Use req.params.id to access route parameters

  console.log(id);

  if (!id) {
    throw new ApiError(403, "Video not found");
  }

  const isDeleted = await VideoContent.destroy({
    where: {
      id: id,
    },
  });

  if (!isDeleted) {
    throw new ApiError(403, "Facing some issue deleting this video");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Free Video Content deleted successfully"));
});

// -=======================================================================================
// PDF
const uploadFreeContentPdf = asyncHandler(async (req, res) => {
  const { file } = req;

  if (!file) {
    throw new ApiError(403, "pdf file not available");
  }

  console.log(file);

  const randomId = Math.floor(Math.random() * 1000000);

  console.log(randomId);

  const pdf = await PdfContent.create({
    id: randomId,
    pdf: `/temp/${file.originalname}`, // i am getting it null here
    is_paid: false,
    timestamp: new Date(),
  });

  console.log(pdf);

  if (!pdf) {
    throw new ApiError(403, "error while uploading pdf");
  }

  res.status(200).json(new ApiResponse(200, pdf, "PDF uploaded successfully "));
});

const deleteFreeContentPdf = asyncHandler(async (req, res) => {
  const id = req.params.id; // Use req.params.id to access route parameters

  console.log(id);

  if (!id) {
    throw new ApiError(403, "PDF not found");
  }

  const isDeleted = await PdfContent.destroy({
    where: {
      id: id,
    },
  });

  if (!isDeleted) {
    throw new ApiError(403, "Facing some issue deleting this pdf");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Free PDF Content deleted successfully"));
});

// [=--------------------------------------------------------------------------------]

const uploadSchoolInfo = asyncHandler(async (req, res) => {
  const logo = req.file;

  const { name, address } = req.body;

  console.log(name, address);

  if (!logo) {
    throw new ApiError(403, "Logo not available");
  }

  const existingSchool = await School.findOne({ where: { name } });

  if (existingSchool) {
    throw new ApiError(403, "School Already exists");
  }

  const randomId = Math.floor(Math.random() * 1000000);

  const newEntry = await School.create({
    id: randomId,
    name: name,
    address: address,
    logo: `/temp/${logo.originalname}`,
  });

  if (!newEntry) {
    throw new ApiError(400, "Error while creating a new entry");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, newEntry, "School added Successfully"));
});

const deleteSchoolInfo = asyncHandler(async (req, res) => {
  const id = req.params.id; // Use req.params.id to access route parameters

  console.log(id);

  if (!id) {
    throw new ApiError(403, "School not found");
  }

  const isDeleted = await School.destroy({
    where: {
      id: id,
    },
  });

  if (!isDeleted) {
    throw new ApiError(403, "Facing some issue deleting the school");
  }

  res.status(200).json(new ApiResponse(200, {}, "School deleted successfully"));
});

const getSchoolInfo = asyncHandler(async (req, res) => {
  const data = await School.findAll();

  if (!data) {
    throw new ApiError(403, "Schools data not found");
  }

  res.status(200).json(new ApiResponse(200, { data }, "School data fetched"));
});

// ---------------------------------NEWS AND BLOGS--------------------------------------

const getNewsAndBlogs = asyncHandler(async (req, res) => {
  const data = await News.findAll();

  if (!data) {
    throw new ApiError(403, "Schools data not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { data }, "News and blogs data fetched"));
});

const uploadNewsAndBlogs = asyncHandler(async (req, res) => {
  const { headline, description } = req.body;

  let image = req.file ? req.file : null; // Handle the image upload

  console.log(headline, description, image);

  const existingHeadline = await News.findOne({ where: { headline } });

  if (existingHeadline) {
    throw new ApiError(403, "Same news cannot be published more than once");
  }

  const randomId = Math.floor(Math.random() * 1000000);

  const newEntry = await News.create({
    id: randomId,
    headline: headline,
    description: description,
    image: `/temp/${image.originalname}`,
  });

  if (!newEntry) {
    throw new ApiError(403, "facing some issue ");
  }

  res
    .status(200)
    .json(new ApiResponse(200, newEntry, "News added successfully"));
});

const deleteNewsAndBlogs = asyncHandler(async (req, res) => {
  const id = req.params.id; // Use req.params.id to access route parameters

  console.log(id);

  if (!id) {
    throw new ApiError(403, "News not found");
  }

  const isDeleted = await News.destroy({
    where: {
      id: id,
    },
  });

  if (!isDeleted) {
    throw new ApiError(403, "Facing some issue deleting the News");
  }

  res.status(200).json(new ApiResponse(200, {}, "News deleted successfully"));
});

// ---------------------------TESTIMONIALS-------------------------------------------------

const getTestimonials = asyncHandler(async (req, res) => {
  const data = await Testimonial.findAll();

  if (!data) {
    throw new ApiError(403, "Testimonials data not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { data }, "Testimonials  data fetched"));
});

const uploadTestimonials = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  let image = req.file;

  console.log(name, description, image);

  const existingBuddy = await Testimonial.findOne({ where: { name } });

  if (existingBuddy) {
    throw new ApiError(403, "Same person cannot share review again");
  }

  const randomId = Math.floor(Math.random() * 1000000);

  const newEntry = await Testimonial.create({
    id: randomId,
    name: name,
    description: description,
    image: `/temp/${image.originalname}`,
  });

  if (!newEntry) {
    throw new ApiError(403, "facing some issue ");
  }

  res
    .status(200)
    .json(new ApiResponse(200, newEntry, "Testimonial added successfully"));
});

const deleteTestimonials = asyncHandler(async (req, res) => {
  const id = req.params.id; // Use req.params.id to access route parameters

  console.log(id);

  if (!id) {
    throw new ApiError(403, "Testimonial not found");
  }

  const isDeleted = await Testimonial.destroy({
    where: {
      id: id,
    },
  });

  if (!isDeleted) {
    throw new ApiError(403, "Facing some issue deleting the Testimonial");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Testimonial deleted successfully"));
});

// -----------------------------------------------------------------------------

const uploadStudent = asyncHandler(async (req, res) => {
  let excel_file = req.file;

  const { schoolname } = req.body;

  console.log(excel_file);
  const randomId = Math.floor(Math.random() * 1000000);

  const newEntry = await Student.create({
    id: randomId,
    excel_file: `/temp/${excel_file.originalname}`,
    schoolname: schoolname,
  });

  if (!newEntry) {
    throw new ApiError(403, "facing some issue ");
  }

  res
    .status(200)
    .json(new ApiResponse(200, newEntry, "Student data added successfully"));
});

// -------------------------------------------------------------------------------

// -----------------------------------------------------------------------------
export {
  loginUser,
  logoutUser,
  registerUser,
  showDashboardDetails,
  showGallery,
  uploadImage,
  deleteImage,
  uploadFreeContentImage,
  deleteFreeContentImage,
  uploadFreeContentVideo,
  uploadFreeContentPdf,
  deleteFreeContentVideo,
  deleteFreeContentPdf,
  uploadSchoolInfo,
  deleteSchoolInfo,
  uploadNewsAndBlogs,
  deleteNewsAndBlogs,
  getTestimonials,
  uploadTestimonials,
  deleteTestimonials,
  uploadStudent,
  showProfile,
  getContent,
  getSchoolInfo,
  showBanner,
  uploadBannerImage,
  deleteBannerImage,
  getNewsAndBlogs,
  updateProfile,
  updatePassword,
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQ5ODk5LCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWF0IjoxNzE2NzkwNzc1LCJleHAiOjE3MTczMDkxNzV9.PhaO1CO7ta-8s4shjKxzeAOf9ows4nMTaFiR3nyDHl4

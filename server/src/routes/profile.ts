import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfileImage,
  updateUserProfilePassword,
  updateVerifiedStatus,
  updateRole,
} from "../controllers/profile";
import { isLoggedIn } from "../middleware";
const router = express.Router();
router.get("/profile/:id", isLoggedIn, getUserProfile);
router.put("/profile/:id", isLoggedIn, updateUserProfile);
router.patch("/profile/image/:id", isLoggedIn, updateUserProfileImage);
router.patch("/profile/password/:id", isLoggedIn, updateUserProfilePassword);
router.patch("/profile/verfied/:id", isLoggedIn, updateVerifiedStatus);
router.patch("/profile/role/:id", isLoggedIn, updateRole);

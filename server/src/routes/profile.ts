import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfileImage,
  updateUserProfilePassword,
  updateVerifiedStatus,
  updateRole,
  getOtherUserProfile,
} from "../controllers/profile";
import { isLoggedIn } from "../middleware";
import wrapAsync from "../utils";
const router = express.Router();
router
  .route("/")
  .get(isLoggedIn, wrapAsync(getUserProfile))
  .put(isLoggedIn, wrapAsync(updateUserProfile));
router.get("/:username", wrapAsync(getOtherUserProfile));
router.patch("/image/:id", isLoggedIn, wrapAsync(updateUserProfileImage));
router.patch("/password/:id", isLoggedIn, wrapAsync(updateUserProfilePassword));
router.patch("/verfied/:id", isLoggedIn, wrapAsync(updateVerifiedStatus));
router.patch("/role/:id", isLoggedIn, wrapAsync(updateRole));
export { router as profileRoute };

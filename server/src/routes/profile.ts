import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  updateUserProfileImage,
  updateUserProfilePassword,
  updateVerifiedStatus,
  updateRole,
  getOtherUserProfile,
  getStatsInProfile,
  getOthersStatsInProfile,
} from "../controllers/profile";
import { isLoggedIn } from "../middleware";
import wrapAsync from "../utils";
const router = express.Router();
router
  .route("/")
  .get(isLoggedIn, wrapAsync(getUserProfile))
  .patch(isLoggedIn, wrapAsync(updateUserProfile));
router.patch("/image", isLoggedIn, wrapAsync(updateUserProfileImage));
router.route("/stats").get(isLoggedIn, wrapAsync(getStatsInProfile));
router.route("/stats:id").get(isLoggedIn, wrapAsync(getOthersStatsInProfile));
router.get("/:username", wrapAsync(getOtherUserProfile));
router.patch("/password/:id", isLoggedIn, wrapAsync(updateUserProfilePassword));
router.patch("/verfied/:id", isLoggedIn, wrapAsync(updateVerifiedStatus));
router.patch("/role/:id", isLoggedIn, wrapAsync(updateRole));
export { router as profileRoute };

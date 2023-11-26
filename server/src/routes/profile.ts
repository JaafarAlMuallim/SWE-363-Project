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
import wrapAsync from "../utils";
const router = express.Router();
router.get("/profile/:id", isLoggedIn, wrapAsync(getUserProfile));
router.put("/profile/:id", isLoggedIn, wrapAsync(updateUserProfile));
router.patch(
  "/profile/image/:id",
  isLoggedIn,
  wrapAsync(updateUserProfileImage),
);
router.patch(
  "/profile/password/:id",
  isLoggedIn,
  wrapAsync(updateUserProfilePassword),
);
router.patch(
  "/profile/verfied/:id",
  isLoggedIn,
  wrapAsync(updateVerifiedStatus),
);
router.patch("/profile/role/:id", isLoggedIn, wrapAsync(updateRole));
export { router as profileRoute };

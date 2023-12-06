import express from "express";
const router = express.Router();
// import { user } from "../controllers/user";
// router.route("/user").get(user.get).post(user.post);
import {
  signUp,
  login,
  devUsers,
  followUser,
  isFollowingUser,
  unfollowUser,
  logout,
} from "../controllers/user";
import wrapAsync from "../utils";
router.route("/signup").post(wrapAsync(signUp));
router.route("/login").post(wrapAsync(login));
router.route("/about").get(wrapAsync(devUsers));
router.route("/logout").post(wrapAsync(logout));
router.route("/follow/:id").post(wrapAsync(followUser));
//router.route("/bookmark/:id").post(wrapAsync(bookmark));
router.route("/unfollow/:id").post(wrapAsync(unfollowUser));
router.route("/following/:id").get(wrapAsync(isFollowingUser));
export { router as userRoute };

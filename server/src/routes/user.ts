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
  bookMarkArticle,
  unBookMarkArticle,
  bookmarkedArticles,
  changeRole,
} from "../controllers/user";
import wrapAsync from "../utils";
import { isAdmin, isLoggedIn } from "../middleware";
router.route("/signup").post(wrapAsync(signUp));
router.route("/login").post(wrapAsync(login));
router.route("/about").get(wrapAsync(devUsers));
router.route("/logout").post(wrapAsync(logout));
router.route("/follow/:id").post(wrapAsync(followUser));
router.route("/unfollow/:id").post(wrapAsync(unfollowUser));
router.route("/following/:id").get(wrapAsync(isFollowingUser));
router.route("/bookmark/:id").post(wrapAsync(bookMarkArticle));
router.route("/unbookmark/:id").post(wrapAsync(unBookMarkArticle));
router.route("/bookmarked").get(wrapAsync(bookmarkedArticles));
router
  .route("/changerole/:id")
  .patch(isLoggedIn, isAdmin, wrapAsync(changeRole));
export { router as userRoute };

import express from "express";
const router = express.Router();
import {
  signUp,
  login,
  devUsers,
  isFollowingUser,
  logout,
  getBookmarkedStatus,
  bookMarkArticle,
  unBookMarkArticle,
  bookmarkedArticles,
  changeRole,
  changeFollowStatus,
  checkRole,
  getUserFollowing,
  getUserFollowers,
} from "../controllers/user";
import wrapAsync from "../utils";
import { isAdmin, isLoggedIn } from "../middleware";
router.route("/signup").post(wrapAsync(signUp));
router.route("/login").post(wrapAsync(login));
router.route("/about").get(wrapAsync(devUsers));
router.route("/logout").post(isLoggedIn, wrapAsync(logout));
router.route("/following").get(isLoggedIn, wrapAsync(getUserFollowing));
router.route("/follower").get(isLoggedIn, wrapAsync(getUserFollowers));
router.route("/follow/:id").post(isLoggedIn, wrapAsync(changeFollowStatus));
router.route("/following/:id").get(isLoggedIn, wrapAsync(isFollowingUser));
router.route("/bookmark/:id").post(isLoggedIn, wrapAsync(bookMarkArticle));
router.route("/unbookmark/:id").post(isLoggedIn, wrapAsync(unBookMarkArticle));
router.route("/bookmarked").get(isLoggedIn, wrapAsync(bookmarkedArticles));
router
  .route("/isbookmarked/:id")
  .get(isLoggedIn, wrapAsync(getBookmarkedStatus));
router.route("checkRole").get(isLoggedIn, wrapAsync(checkRole));
router
  .route("/changerole/:id")
  .patch(isLoggedIn, isAdmin, wrapAsync(changeRole));
export { router as userRoute };

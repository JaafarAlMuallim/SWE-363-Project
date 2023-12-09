import express from "express";
import {
  addComment,
  changeArticleStatus,
  deleteArticle,
  getArticleById,
  getArticleByTag,
  getArticles,
  getDrafted,
  getPublished,
  saveArticle,
  updateArticle,
  updateLikes,
} from "../controllers/article";
import {
  canDeleteArticle,
  canReview,
  isArticleAuthor,
  isLoggedIn,
} from "../middleware";
import wrapAsync from "../utils";
const router = express.Router();

router.route("/").get(getArticles).post(isLoggedIn, wrapAsync(saveArticle));
router.route("/articleTags").get(wrapAsync(getArticleByTag));
router.route("/drafted").get(wrapAsync(getDrafted));
router.route("/published").get(wrapAsync(getPublished));
router.route("/articleTags").get(wrapAsync(getArticleByTag));
router.route("/like/:id").patch(wrapAsync(updateLikes));
router.route("/comment/:id").post(isLoggedIn, wrapAsync(addComment));
router
  .route("/:id")
  .get(getArticleById)
  .put(isLoggedIn, isArticleAuthor, wrapAsync(updateArticle))
  .delete(isLoggedIn, canDeleteArticle, wrapAsync(deleteArticle));

router
  .route("/:id/approve")
  .patch(isLoggedIn, canDeleteArticle, wrapAsync(updateArticle));
router
  .route("/:id/reject")
  .patch(isLoggedIn, canDeleteArticle, wrapAsync(updateArticle));

router
  .route("/:id/changeArticleStatus")
  .patch(isLoggedIn, canReview, wrapAsync(changeArticleStatus));

export { router as articleRoute };

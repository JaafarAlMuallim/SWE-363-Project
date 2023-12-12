import express from "express";
import getDraftedById, {
  addComment,
  changeArticleStatus,
  deleteArticle,
  getArticleById,
  getArticleByTag,
  getArticles,
  getComments,
  getDrafted,
  getInReview,
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
router.route("/drafted").get(isLoggedIn, wrapAsync(getDrafted));
router.route("/drafted/:id").get(isLoggedIn, wrapAsync(getDraftedById));
router.route("/published").get(wrapAsync(getPublished));
router.route("/inReview").get(isLoggedIn, canReview, wrapAsync(getInReview));
router.route("/articleTags").get(wrapAsync(getArticleByTag));
router.route("/like/:id").patch(wrapAsync(updateLikes));
router
  .route("/comment/:id")
  .get(getComments)
  .post(isLoggedIn, wrapAsync(addComment));
router
  .route("/:id")
  .get(getArticleById)
  .put(isLoggedIn, isArticleAuthor, wrapAsync(updateArticle))
  .delete(isLoggedIn, canDeleteArticle, wrapAsync(deleteArticle));

router
  .route("/:id/changeArticleStatus")
  .patch(isLoggedIn, canReview, wrapAsync(changeArticleStatus));

export { router as articleRoute };

import express from "express";
import {
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
import { canDeleteArticle, isArticleAuthor, isLoggedIn } from "../middleware";
import wrapAsync from "../utils";
const router = express.Router();

router.route("/").get(getArticles).post(isLoggedIn, wrapAsync(saveArticle));
router.route("/drafted").get(wrapAsync(getDrafted));
router.route("/published").get(wrapAsync(getPublished));
router.route("/articleTags").get(wrapAsync(getArticleByTag));
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
router.route("/like/:id").patch(wrapAsync(updateLikes));



router.route("/:id/changeArticleStatus").patch(isLoggedIn, wrapAsync(changeArticleStatus))

router.route("/articleTags").get(wrapAsync(getArticleByTag));


export { router as articleRoute };

import express from "express";
import {
  deleteArticle,
  getArticleById,
  getArticleByTag,
  getArticles,
  saveArticle,
  updateArticle,
} from "../controllers/article";
import { canDeleteArticle, isArticleAuthor, isLoggedIn } from "../middleware";
import wrapAsync from "../utils";
const router = express.Router();

router.route("/").get(getArticles).post(isLoggedIn, wrapAsync(saveArticle));
router
  .route("/:id")
  .get(getArticleById)
  .put(isLoggedIn, isArticleAuthor, wrapAsync(updateArticle))
  .delete(isLoggedIn, canDeleteArticle, wrapAsync(deleteArticle));

router.route("/articleTags").get(getArticleByTag);

export { router as articleRoute };

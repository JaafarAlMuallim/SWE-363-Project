import express from "express";
import {
  deleteArticle,
  getArticleById,
  getArticleByTag,
  getArticles,
  saveArticle,
  updateArticle,
} from "../controllers/article";
const router = express.Router();

router.route("/").get(getArticles).post(saveArticle);
router
  .route("/:id")
  .get(getArticleById)
  .put(updateArticle)
  .delete(deleteArticle);

router.route("/articleTags").get(getArticleByTag);

export { router as articleRoute };

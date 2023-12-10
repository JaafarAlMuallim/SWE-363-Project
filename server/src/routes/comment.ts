import express from "express";
import {
  updateComment,
  getComment,
  deleteComment,
} from "../controllers/comment";
import { canDeleteComment, isLoggedIn, isCommentAuthor } from "../middleware";
import wrapAsync from "../utils";
const router = express.Router();

router
  .route("/:id")
  .get(wrapAsync(getComment))
  .patch(isLoggedIn, isCommentAuthor, wrapAsync(updateComment))
  .delete(isLoggedIn, canDeleteComment, wrapAsync(deleteComment));

export { router as commentRouter };

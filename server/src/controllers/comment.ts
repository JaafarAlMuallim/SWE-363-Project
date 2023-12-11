import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import db from "../db";
import { comment, Comment, users } from "../schema";
type CommentData = Omit<Comment, "comment_id">;

export async function getComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const foundComment = await db.query.comment.findFirst({
      where: eq(comment.comment_id, id),
      with: {
        user: true,
      },
    });
    res.send(foundComment);
  } catch (err) {
    next(err);
  }
}

export async function updateComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await db
      .update(comment)
      .set({
        content: content,
      })
      .where(eq(comment.comment_id, id))
      .returning();

    res.send(updatedComment);
  } catch (err) {
    next(err);
  }
}

export async function deleteComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const deletedComment = await db
      .delete(comment)
      .where(eq(comment.comment_id, id))
      .returning();
    res.send(deletedComment);
  } catch (err) {
    next(err);
  }
}

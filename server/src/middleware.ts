import { Request, Response, NextFunction } from "express";
import db from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";
export async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.headers.authorization.split(" ")[1]) {
    next();
  } else {
    console.log("You must be logged in");
    res.status(401).send("You must be logged in");
  }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  const currentUser = await db.query.users.findFirst({
    where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
  });
  if (currentUser.role === "admin") {
    next();
  } else {
    res.status(403).send("You are not authorized");
  }
}

export async function isArticleAuthor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    req.headers.authorization.split(" ")[1] === req.body.article.author.user_id
  ) {
    next();
  } else {
    res.status(403).send("You are not authorized");
  }
}
export async function isCommentAuthor(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    req.headers.authorization.split(" ")[1] === req.body.comment.author.user_id
  ) {
    next();
  } else {
    res.status(403).send("You are not authorized");
  }
}

export async function canReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const currentUser = await db.query.users.findFirst({
    where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
  });
  if (currentUser.role === "reviewer" || currentUser.role === "admin") {
    next();
  } else {
    res.status(403).send("You are not authorized");
  }
}

export async function canPublish(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const currentUser = await db.query.users.findFirst({
    where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
  });
  if (
    currentUser.role === "admin" ||
    currentUser.role === "reviewer" ||
    currentUser.verified
  ) {
    next();
  } else {
    res.status(403).send("You are not authorized");
  }
}

export async function canDeleteArticle(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const currentUser = await db.query.users.findFirst({
    where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
  });
  if (
    currentUser.user_id === req.body.article.author.user_id ||
    currentUser.role === "admin"
  ) {
    next();
  } else {
    res.status(403).send("You are not authorized");
  }
}

export async function canDeleteComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const currentUser = await db.query.users.findFirst({
    where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
  });
  if (
    currentUser.user_id === req.body.comment.author.user_id ||
    currentUser.role === "admin"
  ) {
    next();
  } else {
    res.status(403).send("You are not authorized");
  }
}

export async function canEditOrg(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const currentUser = await db.query.users.findFirst({
    where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
  });
  if (currentUser.role === "admin") {
    next();
  } else {
    res.status(403).send("You are not authorized");
  }
}

import { Request, Response, NextFunction } from "express";
export async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.body.user) {
    next();
  } else {
    res.status(401).send("You must be logged in");
  }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.body.user.role === "admin") {
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
  if (req.body.user === req.body.article.author) {
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
  if (req.body.user === req.body.comment.author) {
    next();
  } else {
    res.status(403).send("You are not authorized");
  }
}

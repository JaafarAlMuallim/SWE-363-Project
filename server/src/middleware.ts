import { Request, Response, NextFunction } from "express";
export async function isLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).send("You must be logged in");
  }
}

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session.user.role === "admin") {
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
  if (req.session.user.user_id === req.body.article.author.user_id) {
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
  if (req.session.user.user_id === req.body.comment.author.user_id) {
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
  if (
    req.session.user.role === "reviewer" ||
    req.session.user.role === "admin"
  ) {
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
  if (
    req.session.user.role === "admin" ||
    req.session.user.role === "reviewer" ||
    req.session.user.verified
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
  if (
    req.session.user.user_id === req.body.article.author.user_id ||
    req.session.user.role === "admin"
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
  if (
    req.session.user.user_id === req.body.comment.author.user_id ||
    req.session.user.role === "admin"
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
  if (req.session.user.role === "admin") {
    next();
  } else {
    res.status(403).send("You are not authorized");
  }
}

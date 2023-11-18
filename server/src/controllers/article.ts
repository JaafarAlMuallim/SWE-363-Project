import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import db from "../db";
import { Article, article, article_tags } from "../schema";
type ArticleData = Omit<Article, "article_id">;
export async function getArticles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const articles = await db.query.article.findMany({
      with: { article_tags: true },
    });
    res.send(articles);
  } catch (e) {
    next(e);
  }
}

export async function getArticleById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const foundArticle = await db.query.article.findFirst({
      with: { article_tags: true },
      where: eq(article.article_id, req.params.id),
    });
    res.send(foundArticle);
  } catch (e) {
    next(e);
  }
}

export async function saveArticle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const articleData: ArticleData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      user_id: req.body.user_id,
      org_id: req.body.org_id,
      article_image: req.body.article_image,
      views: 0,
      bookmarks: 0,
      likes: 0,
      date: new Date().toISOString(),
      article_status: "draft",
    };
    const newArticle = await db
      .insert(article)
      .values([articleData])
      .returning();
    for (const tag of req.body.tags) {
      const newArticleTag = await db
        .insert(article_tags)
        .values([{ article_id: newArticle[0].article_id, tag: tag }]);
    }
    res.send(newArticle);
  } catch (e) {
    next(e);
  }
}

export async function updateArticle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const articleData: ArticleData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      user_id: req.body.user_id,
      org_id: req.body.org_id,
      article_image: req.body.article_image,
      views: 0,
      bookmarks: 0,
      likes: 0,
      date: new Date().toISOString(),
      article_status: req.body.article_status || "draft",
    };
    const updatedArticle = await db
      .update(article)
      .set(articleData)
      .where(eq(article.article_id, req.params.id))
      .returning();
    res.send(updatedArticle);
  } catch (e) {
    next(e);
  }
}

export async function deleteArticle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const deleteArticleTags = await db
      .delete(article_tags)
      .where(eq(article_tags.article_id, req.params.id));

    const deletedArticle = await db
      .delete(article)
      .where(eq(article.article_id, req.params.id))
      .returning();
    res.send(deletedArticle);
  } catch (e) {
    next(e);
  }
}

export async function getArticleByTag(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const foundArticle = await db.query.article.findMany({
      with: { article_tags: true },
      where: eq(article_tags.tag_id, req.params.id),
    });
    res.send(foundArticle);
  } catch (e) {
    next(e);
  }
}

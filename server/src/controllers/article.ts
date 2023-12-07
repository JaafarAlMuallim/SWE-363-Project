import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import db from "../db";
import { Article, article, article_tags } from "../schema";
type ArticleData = Omit<Article, "article_id">;
export async function getArticles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const articles = await db.query.article.findMany({
      with: { article_tags: true },
    });
    console.log(articles);
    res.send(articles);
  } catch (e) {
    next(e);
  }
}

export async function getArticleById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const foundArticle = await db.query.article.findFirst({
      with: { article_tags: true, comment: true },
      where: eq(article.article_id, req.params.id),
    });
    await db
      .update(article)
      .set({ views: foundArticle.views + 1 })
      .where(eq(article.article_id, req.params.id));
    console.log(foundArticle);
    res.send(foundArticle);
  } catch (e) {
    next(e);
  }
}

export async function saveArticle(
  req: Request,
  res: Response,
  next: NextFunction,
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
      await db
        .insert(article_tags)
        .values([{ article_id: newArticle[0].article_id, tag: tag }]);
    }
    res.send(newArticle);
  } catch (e) {
    next(e);
  }
}

export async function publishArticle(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await db
      .update(article)
      .set({ article_status: "published" })
      .where(eq(article.article_id, req.params.id));
    res.send(data);
  } catch (e) {
    next(e);
  }
}
export async function updateLikes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentArticle = await db.query.article.findFirst({
      where: eq(article.article_id, req.params.id),
    });

    const data = await db
      .update(article)
      .set({ likes: currentArticle.likes + 1 })
      .where(eq(article.article_id, req.params.id));
    res.send(data);
  } catch (e) {
    next(e);
  }
}

export async function updateArticle(
  req: Request,
  res: Response,
  next: NextFunction,
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
  next: NextFunction,
) {
  try {
    await db
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
  next: NextFunction,
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

export async function getDrafted(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const draftedArticles = await db.query.article.findMany({
      where: eq(article.article_status, "draft"),
      with: { article_tags: true },
    });
    res.send(draftedArticles);
  } catch (e) {
    next(e);
  }
}

export async function getPublished(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const publishedArticles = await db.query.article.findMany({
      where: eq(article.article_status, "published"),
      with: { article_tags: true },
    });
    res.send(publishedArticles);
  } catch (e) {
    next(e);
  }
}

export async function getInReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const inReviewArticles = await db.query.article.findMany({
      where: eq(article.article_status, "in_review"),
      with: { article_tags: true },
    });
    res.send(inReviewArticles);
  } catch (e) {
    next(e);
  }
}

export async function changeArticleStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const updatedArticle = await db
      .update(article)
      .set({
        article_status: req.body.article_status,
      })
      .where(eq(article.article_id, req.params.id))
      .returning();

    res.send(updatedArticle);
  } catch (e) {
    next(e);
  }
}

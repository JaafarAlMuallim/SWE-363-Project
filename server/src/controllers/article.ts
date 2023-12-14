import { and, eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import db from "../db";
import {
  Article,
  article,
  article_like,
  article_tags,
  comment,
  Comment,
  user_bookmarks,
  users,
} from "../schema";
type ArticleData = Omit<Article, "article_id">;
type CommentData = Omit<Comment, "comment_id">;
export async function getArticles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const articles = await db.query.article.findMany({
      with: { article_tags: true, org: true, user: true },
    });
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
      with: {
        article_tags: true,
        comment: { with: { user: true } },
        user: true,
      },
      where: eq(article.article_id, req.params.id),
    });
    if (foundArticle.article_status === "published") {
      await db
        .update(article)
        .set({ views: foundArticle.views + 1 })
        .where(eq(article.article_id, req.params.id));
    }
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
    console.log(req.body);
    const articleData: ArticleData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      content: req.body.content,
      user_id: req.headers.authorization.split(" ")[1],
      org_id: req.body.org_id,
      article_image: req.body.article_image,
      views: 0,
      bookmarks: 0,
      likes: 0,
      date: new Date().toISOString(),
      article_status: req.body.article_status || "draft",
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
    await db.delete(comment).where(eq(comment.article_id, req.params.id));
    await db
      .delete(user_bookmarks)
      .where(eq(user_bookmarks.article_id, req.params.id));

    await db
      .delete(article)
      .where(eq(article.article_id, req.params.id))
      .returning();
    res.send({ message: "Article deleted" });
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
      where: and(
        eq(article.article_status, "draft"),
        eq(article.user_id, req.headers.authorization.split(" ")[1]),
      ),
      with: { article_tags: true, user: true },
    });
    res.send(draftedArticles);
  } catch (e) {
    next(e);
  }
}
export default async function getDraftedById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const draftedArticle = await db.query.article.findFirst({
      with: { article_tags: true },
      where: and(
        eq(article.article_status, "draft"),
        eq(article.article_id, req.params.id),
        eq(article.user_id, req.headers.authorization.split(" ")[1]),
      ),
    });
    res.send(draftedArticle);
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
      with: {
        org: true,
        article_tags: true,
        comment: true,
        user: true,
      },
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

export async function getComments(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const comments = await db.query.comment.findMany({
      where: eq(comment.article_id, req.params.id),
      with: { user: true },
    });
    res.send(comments);
  } catch (e) {
    next(e);
  }
}

export async function addComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
    });
    const newComment: CommentData = {
      article_id: req.params.id,
      user_id: currentUser.user_id,
      content: req.body.content,
      date: new Date().toISOString(),
      comment_likes: 0,
    };

    const data = await db.insert(comment).values([newComment]).returning();
    res.send(data[0]);
  } catch (e) {
    next(e);
  }
}

export async function getArticlesByUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const articles = await db.query.article.findMany({
      where: and(
        eq(article.user_id, req.headers.authorization.split(" ")[1]),
        eq(article.article_status, "published"),
      ),
      with: { article_tags: true, org: true, user: true },
    });
    res.send(articles);
  } catch (e) {
    next(e);
  }
}

export async function getArticlesByOtherUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const articles = await db.query.article.findMany({
      where: and(
        eq(article.user_id, req.params.id),
        eq(article.article_status, "published"),
      ),
      with: { article_tags: true, org: true, user: true },
    });
    res.send(articles);
  } catch (e) {
    next(e);
  }
}
export async function updateUserData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userData = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      overview: req.body.bio,
    };
    const updatedUser = await db
      .update(users)
      .set(userData)
      .where(eq(users.user_id, req.headers.authorization.split(" ")[1]))
      .returning();
    res.send(updatedUser);
  } catch (e) {
    next(e);
  }
}

export async function getArticlesLikedByUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const articles = await db.query.article_like.findMany({
      where: eq(article_like.user_id, req.headers.authorization.split(" ")[1]),
      with: {
        article: {
          with: { article_tags: true, org: true, user: true },
        },
      },
    });
    res.send(articles);
  } catch (e) {
    next(e);
  }
}

import bcrypt from "bcrypt";
import { and, eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import db from "../db";
import {
  User,
  users,
  user_follow,
  UserFollow,
  article,
  UserBookmark,
  user_bookmarks,
} from "../schema";
type UserType = Omit<
  User,
  "user_id" | "x_account" | "linkdin_account" | "website" | "user_image"
>;
type UserBookmarkType = Omit<UserBookmark, "bookmark_id">;
type UserFollowType = Omit<UserFollow, "follow_id">;
export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user: UserType = {
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
      username: req.body.username,
      role: "user",
      verified: false,
    };
    const insertedData = await db.insert(users).values([user]).returning();
    const { password, ...rest } = insertedData[0];
    res.send(rest);
  } catch (e) {
    next(e);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, req.body.email),
    });
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const { password, ...userWithoutPassword } = user;
      res.send(userWithoutPassword);
    } else {
      res.send({ message: "Incorrect password" });
    }
  } catch (e) {
    next(e);
  }
}

export async function devUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const devUsers = await db
      .select()
      .from(users)
      .where(eq(users.role, "admin"));
    // get all users without passwords
    devUsers.forEach((user) => {
      delete user.password;
    });
    res.send(devUsers);
  } catch (e) {
    next(e);
  }
}

export async function changeFollowStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const followedUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.params.id),
    });

    const currentUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
    });
    const isFollowing = await db.query.user_follow.findFirst({
      where: and(
        eq(user_follow.user_id, currentUser.user_id),
        eq(user_follow.follow_user_id, followedUser.user_id),
      ),
    });
    if (isFollowing) {
      const removeFollow = await db
        .delete(user_follow)
        .where(
          and(
            eq(user_follow.user_id, currentUser.user_id),
            eq(user_follow.follow_user_id, followedUser.user_id),
          ),
        )
        .returning();
      res.send(removeFollow);
    } else {
      const userFollow: UserFollowType = {
        user_id: currentUser.user_id,
        follow_user_id: followedUser.user_id,
      };
      const addFollow = await db
        .insert(user_follow)
        .values([userFollow])
        .returning();
      res.send(addFollow[0]);
    }
  } catch (e) {
    next(e);
  }
}

export async function isFollowingUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const followedUser = await db.query.users.findFirst({
      where: eq(users.username, req.params.id),
    });
    const isFollowing = await db.query.user_follow.findFirst({
      where: and(
        eq(user_follow.user_id, req.headers.authorization.split(" ")[1]),
        eq(user_follow.follow_user_id, followedUser.user_id),
      ),
    });
    res.send({ isFollowing: isFollowing ? true : false });
  } catch (e) {
    next(e);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    req.session.destroy((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Logged out" });
      }
    });
  } catch (e) {
    next(e);
  }
}

export async function bookMarkArticle(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
    });
    const currentArticle = await db.query.article.findFirst({
      where: eq(article.article_id, req.params.id),
    });
    const userArticle: UserBookmarkType = {
      user_id: currentUser.user_id,
      article_id: currentArticle.article_id,
    };
    const addArticle = await db
      .insert(user_bookmarks)
      .values([userArticle])
      .returning();
    res.send(addArticle);
  } catch (e) {
    next(e);
  }
}

export async function unBookMarkArticle(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
    });
    const currentArticle = await db.query.article.findFirst({
      where: eq(article.article_id, req.params.id),
    });
    const removeArticle = await db
      .delete(user_bookmarks)
      .where(
        and(
          eq(user_bookmarks.user_id, currentUser.user_id),
          eq(user_bookmarks.article_id, currentArticle.article_id),
        ),
      )
      .returning();
    res.send(removeArticle);
  } catch (e) {
    next(e);
  }
}

export async function bookmarkedArticles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    console.log(req.headers.authorization.split(" ")[1]);
    const bookmarked = await db.query.user_bookmarks.findMany({
      where: eq(
        user_bookmarks.user_id,
        req.headers.authorization.split(" ")[1],
      ),
      with: {
        article: {
          with: {
            user: true,
            article_tags: true,
            comment: {
              with: {
                user: true,
              },
            },
          },
        },
      },
      //      with: {
      //        user: true,
      //        article_tags: true,
      //        comment: {
      //          with: {
      //            user: true,
      //          },
      //        },
      //      },
      //    },
      //  },
    });
    res.send(bookmarked);
  } catch (e) {
    next(e);
  }
}
export async function getBookmarkedStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
    });
    const currentArticle = await db.query.article.findFirst({
      where: eq(article.article_id, req.params.id),
    });
    const bookmarked = await db.query.user_bookmarks.findFirst({
      where: and(
        eq(user_bookmarks.user_id, currentUser.user_id),
        eq(user_bookmarks.article_id, currentArticle.article_id),
      ),
    });
    if (bookmarked) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (e) {
    next(e);
  }
}

export async function changeBookmark(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
    });
    const currentArticle = await db.query.article.findFirst({
      where: eq(article.article_id, req.params.id),
    });
    const bookmarked = await db.query.user_bookmarks.findFirst({
      where: and(
        eq(user_bookmarks.user_id, currentUser.user_id),
        eq(user_bookmarks.article_id, currentArticle.article_id),
      ),
    });
    if (bookmarked) {
      const removeArticle = await db
        .delete(user_bookmarks)
        .where(
          and(
            eq(user_bookmarks.user_id, currentUser.user_id),
            eq(user_bookmarks.article_id, currentArticle.article_id),
          ),
        )
        .returning();
      res.send(removeArticle);
    }
    const userArticle: UserBookmarkType = {
      user_id: currentUser.user_id,
      article_id: currentArticle.article_id,
    };
    const addArticle = await db
      .insert(user_bookmarks)
      .values([userArticle])
      .returning();
    res.send(addArticle);
  } catch (e) {
    next(e);
  }
}

export async function changeRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const changedUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.params.id),
    });
    const changeRole = await db
      .update(users)
      .set({
        role: req.body.role,
      })
      .where(eq(users.user_id, changedUser.user_id))
      .returning();
    res.send(changeRole);
  } catch (e) {
    next(e);
  }
}

export async function checkRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.headers.authorization.split(" ")[1]),
    });
    res.send(currentUser);
  } catch (e) {
    next(e);
  }
}

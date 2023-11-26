import db from "../db";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { users } from "../schema";

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.user_id, req.params.id),
    });
    res.send(user);
  } catch (e) {
    next(e);
  }
}

export async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await db
      .update(users)
      .set({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        role: req.body.role,
        verified: req.body.verified,
        x_account: req.body.x_account,
        linkdin_account: req.body.linkdin_account,
        website: req.body.website,
        user_image: req.body.user_image,
      })
      .where(eq(users.user_id, req.params.id))
      .returning();
    res.send(user);
  } catch (e) {
    next(e);
  }
}

export async function updateUserProfileImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await db
      .update(users)
      .set({
        user_image: req.body.user_image,
      })
      .where(eq(users.user_id, req.params.id))
      .returning();
    res.send(user);
  } catch (e) {
    next(e);
  }
}

export async function updateUserProfilePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await db
      .update(users)
      .set({
        password: req.body.password,
      })
      .where(eq(users.user_id, req.params.id))
      .returning();
    res.send(user);
  } catch (e) {
    next(e);
  }
}
export async function updateVerifiedStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await db
      .update(users)
      .set({
        verified: req.body.verified,
      })
      .where(eq(users.user_id, req.params.id))
      .returning();
    res.send(user);
  } catch (e) {
    next(e);
  }
}

export async function updateRole(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await db
      .update(users)
      .set({
        role: req.body.role,
      })
      .where(eq(users.user_id, req.params.id))
      .returning();
    res.send(user);
  } catch (e) {
    next(e);
  }
}

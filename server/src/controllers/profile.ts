import db from "../db";
import { eq, and, or } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { User, users, user_prefs, prefs, UserData, orgs } from "../schema";
import { userInfo } from "os";

type UserProfileType = Omit<User, "user_id">;

export async function getUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await db.query.users.findFirst({
    where: eq(users.user_id, req.params.id),

    // depends on giving the id in params or in body
  });
  const userData: UserData = {
    name: req.body.name,
    role: "user",
    user_id: "",
    username: "",
    email: "",
    password: "",
    verified: false,
    x_account: "",
    linkdin_account: "",
    website: "",
    user_image: "",
  };
  res.send(user);
}
export async function getAdminProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await db.query.users.findFirst({
    where: eq(users.user_id, req.params.id),

    // depends on giving the id in params or in body
  });
  const userData: UserData = {
    name: req.body.name,
    role: "admin",
    user_id: "",
    username: "",
    email: "",
    password: "",
    verified: false,
    x_account: "",
    linkdin_account: "",
    website: "",
    user_image: "",
  };
  res.send(user);
}
export async function getReviewerProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await db.query.users.findFirst({
    where: eq(users.user_id, req.params.id),

    // depends on giving the id in params or in body
  });
  const userData: UserData = {
    name: req.body.name,
    role: "reviewer",
    user_id: "",
    username: "",
    email: "",
    password: "",
    verified: false,
    x_account: "",
    linkdin_account: "",
    website: "",
    user_image: "",
  };
  res.send(user);
}
export async function updateAdminProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userData: UserData = {
      name: req.body.name,
      role: "admin",
      user_id: "",
      username: "",
      email: "",
      password: "",
      verified: false,
      x_account: "",
      linkdin_account: "",
      website: "",
      user_image: "",
    };
    // Update the user profile
    const updatedUser = await db
      .update(users)
      .set(userData)
      .where(eq(users.user_id, req.params.id));
    res.send(updatedUser);
  } catch (e) {
    next(e);
  }
}
export async function updateUserProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userData: UserData = {
      name: req.body.name,
      role: "user",
      user_id: "",
      username: "",
      email: "",
      password: "",
      verified: false,
      x_account: "",
      linkdin_account: "",
      website: "",
      user_image: "",
    };
    // Update the user profile
    const updatedUser = await db
      .update(users)
      .set(userData)
      .where(eq(users.user_id, req.params.id));
    res.send(updatedUser);
  } catch (e) {
    next(e);
  }
}
export async function updateReveiwerProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userData: UserData = {
      name: req.body.name,
      role: "reviewer",
      user_id: "",
      username: "",
      email: "",
      password: "",
      verified: false,
      x_account: "",
      linkdin_account: "",
      website: "",
      user_image: "",
    };
    // Update the user profile
    const updatedUser = await db
      .update(users)
      .set(userData)
      .where(eq(users.user_id, req.params.id));
    res.send(updatedUser);
  } catch (e) {
    next(e);
  }
}

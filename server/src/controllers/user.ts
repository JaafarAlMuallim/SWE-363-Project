import bcrypt from "bcrypt";
import { and, eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import db from "../db";
import { User, users, user_follow, UserFollow } from "../schema";
type UserType = Omit<
  User,
  "user_id" | "x_account" | "linkdin_account" | "website" | "user_image"
>;
type UserFollowType = Omit<UserFollow, "follow_id">;
export async function signUp(req: Request, res: Response, next: NextFunction) {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const user: UserType = {
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword,
    username: req.body.username,
    role: "user",
    verified: false,
  };
  const { password, ...rest } = users;
  const insertedData = await db.insert(users).values([user]).returning();
  req.session.user = insertedData[0];
  res.send(insertedData[0]);
}

export async function login(req: Request, res: Response, next: NextFunction) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, req.body.email),
  });
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const { password, ...userWithoutPassword } = user;
    req.session.user = userWithoutPassword;
    res.send(userWithoutPassword);
  } else {
    res.send({ message: "Incorrect password" });
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

export async function followUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = req.session.user;
    const followedUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.params.id),
    });

    console.log("currentUser", currentUser);
    console.log("followedUser", followedUser);

    const userFollow: UserFollowType = {
      user_id: currentUser.user_id,
      follow_user_id: followedUser.user_id,
    };
    console.log("userFollow", userFollow);
    const addFollow = await db
      .insert(user_follow)
      .values([userFollow])
      .returning();
    console.log(addFollow);
    res.send(addFollow);
  } catch (e) {
    res.send(e);
  }
}
export async function unfollowUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = req.session.user;
    const followedUser = await db.query.users.findFirst({
      where: eq(users.user_id, req.params.id),
    });
    const userFollow: UserFollowType = {
      user_id: currentUser.user_id,
      follow_user_id: followedUser.user_id,
    };
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
  } catch (e) {
    res.send(e);
  }
}

export async function isFollowingUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const currentUser = req.session.user;
    const followedUser = await db.query.users.findFirst({
      where: eq(users.username, req.params.id),
    });
    console.log("currentUser", currentUser);
    console.log("followedUser", followedUser);
    const userFollow: UserFollowType = {
      user_id: currentUser.user_id,
      follow_user_id: followedUser.user_id,
    };
    const isFollowing = await db.query.user_follow.findFirst({
      where: and(
        eq(user_follow.user_id, currentUser.user_id),
        eq(user_follow.follow_user_id, followedUser.user_id),
      ),
    });
    res.send(isFollowing);
  } catch (e) {
    next();
  }
}

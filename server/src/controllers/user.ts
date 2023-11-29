import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import db from "../db";
import { User, users } from "../schema";
type UserType = Omit<
  User,
  "user_id" | "x_account" | "linkdin_account" | "website" | "user_image"
>;
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
  const insertedData = await db.insert(rest).values([user]).returning();
  req.session.user = insertedData[0];
  console.log(req.session.user);
  console.log(insertedData[0]);
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

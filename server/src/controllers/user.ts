import db from "../db";
import { eq, and, or } from "drizzle-orm";
import { User, users, user_prefs, prefs } from "../schema";
import bcrypt from "bcrypt";
type UserType = Omit<
  User,
  "user_id" | "x_account" | "linkdin_account" | "website" | "user_image"
>;
export async function signUp(req, res) {
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const user: UserType = {
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword,
    username: req.body.username,
    role: "user",
    verified: false,
  };
  const insertedData = await db.insert(users).values([user]);
  res.send(insertedData);
}

export async function login(req, res) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, req.body.email));
  bcrypt.compare(req.body.password, user[0].password, function (err, result) {
    if (result == true) {
      res.send(user);
    } else {
      res.send("Incorrect password");
    }
  });
}

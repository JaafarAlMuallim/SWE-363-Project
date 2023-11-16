//import express, { Request, Response } from "express";
//import { getAllUsers, addUser } from "./models/connect";

// const app = express();
// const port = 8080;
// app.get("/", async (req: Request, res: Response) => {
//   await addUser(
//     "name",
//     "username",
//     "email",
//     "password",
//     "role",
//     true,
//     "x_account",
//     "x_linkdin",
//     "website",
//     "user_image",
//   );
//   console.log("DONE INSERTING");
//   const data = await getAllUsers();
//   res.send(data);
// });
// app.listen(port, () => {
//   console.log(`app listening at http://localhost:${port}`);
// });
import express from "express";
import {
  Role,
  Status,
  ArticleStatus,
  User,
  UserPrefs,
  Org,
  OrgFounders,
  Interview,
  InterviewQuestions,
  Article,
  ArticleTags,
  Comment,
} from "./schema";

const app = express();
const port = 8080;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

import express from "express";
import { articleRoute } from "./routes/article";
import { orgRoute } from "./routes/org";
import { userRoute } from "./routes/user";
import cors from "cors";
import session from "express-session";
import { User } from "./schema";

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

const app = express();
const port = 8080;
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(express.json());
app.use(cors(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const secret = process.env.SECRET_KEY || "DEV_SECRET_KEY";
const config = {
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000 * 24 * 7,
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 7),
  },
};
app.use(session(config));
app.use("/user", userRoute);
app.use("/article", articleRoute);
app.use("/org", orgRoute);
app.get("/", async (req, res) => {});
app.get("*", async (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

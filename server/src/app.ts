import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import { articleRoute } from "./routes/article";
import { orgRoute } from "./routes/org";
import { profileRoute } from "./routes/profile";
import { userRoute } from "./routes/user";
import { User } from "./schema";

declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

const app = express();
const port = 8080;
const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};
app.use(cors(options));
app.use(express.json());
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
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(session(config));
app.use("/user", userRoute);
app.use("/article", articleRoute);
app.use("/org", orgRoute);
app.use("/profile", profileRoute);
app.get("/", async (req, res) => {});
app.get("*", async (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

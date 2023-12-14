import cors from "cors";
import express from "express";
import { articleRoute } from "./routes/article";
import { orgRoute } from "./routes/org";
import { profileRoute } from "./routes/profile";
import { userRoute } from "./routes/user";
import { commentRouter } from "./routes/comment";

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
app.use("/user", userRoute);
app.use("/article", articleRoute);
app.use("/org", orgRoute);
app.use("/comment", commentRouter);
app.use("/profile", profileRoute);
app.get("/", async (req, res) => {});
app.get("*", async (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

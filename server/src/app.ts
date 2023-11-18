import express from "express";
import { userRoute } from "./routes/user";
import { articleRoute } from "./routes/article";
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/user", userRoute);
app.use("/article", articleRoute);
app.get("/", async (req, res) => {});
app.get("*", async (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

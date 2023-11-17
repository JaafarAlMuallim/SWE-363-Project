import express from "express";
//import { userRoute } from "./routes/user";
//import { articleRoute } from "./routes/article";
//import { interviewRoute } from "./routes/interview";
//import { orgRoute } from "./routes/org";

const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//app.use("/",userRoute )
//app.use("/",articleRoute )
//app.use("/",interviewRoute )
//app.use("/",orgRoute )
app.get("/", async (req, res) => {});
app.get("*", async (req, res) => {
  res.status(404).send("404 Not Found");
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

import express from "express";

const app = express();
const port = 8080;
app.get("/", async (req, res) => {});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

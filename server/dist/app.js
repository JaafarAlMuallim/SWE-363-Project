"use strict";
//import express, { Request, Response } from "express";
//import { getAllUsers, addUser } from "./models/connect";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8080;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});

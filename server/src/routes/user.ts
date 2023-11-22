import express from "express";
const router = express.Router();
// import { user } from "../controllers/user";
// router.route("/user").get(user.get).post(user.post);
import { signUp, login, devUsers } from "../controllers/user";
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/about").get(devUsers);
export { router as userRoute };

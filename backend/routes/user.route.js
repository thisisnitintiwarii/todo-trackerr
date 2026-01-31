
import express from "express"
import { login, logout, me, signup } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup",signup);
authRouter.post("/signin",login);
authRouter.get("/me",me);
authRouter.get("/logout",logout);


export default authRouter
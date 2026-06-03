import { Router } from "express";
import { signUp, signIn, logout } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/logout", logout);

export default router;
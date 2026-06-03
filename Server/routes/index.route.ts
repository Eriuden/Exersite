import { Router } from "express";

import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import questionRoutes from "./question.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/transactions", questionRoutes);

export default router;
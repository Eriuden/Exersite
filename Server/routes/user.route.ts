import { Router } from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAuth)

router.get("/", getAllUsers);

router.get("/:id", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
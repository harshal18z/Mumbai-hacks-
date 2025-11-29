import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/userController.js";

const router = Router();

router.get("/me", authRequired, getProfile);
router.put("/me", authRequired, updateProfile);

export default router;

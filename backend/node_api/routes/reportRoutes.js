import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { generateAndEmailReport } from "../controllers/reportController.js";

const router = Router();

router.post("/generate", authRequired, generateAndEmailReport);

export default router;

import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import { getBudgetRecommendations } from "../controllers/budgetController.js";

const router = Router();

router.get("/recommendations", authRequired, getBudgetRecommendations);

export default router;

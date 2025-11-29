// routes/savingsRoutes.js
import express from "express";
import { getHybridSmartSavings } from "../controllers/savingsController.js";

const router = express.Router();

// 🌱 Hybrid AI Smart Savings Endpoint
router.post("/hybrid-ai", getHybridSmartSavings);

export default router;

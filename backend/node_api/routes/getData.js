import { Router } from "express";
import { authRequired } from "../middleware/authMiddleware.js";
import Transaction from "../models/Transaction.js";
import { getGeminiResponse } from "../services/geminiClient.js";

const router = Router();

router.get("/", authRequired, async (req, res) => {
  try {
    const txs = await Transaction.find({ userId: req.user.id });
    const income = txs.filter(t => t.type === "Income").reduce((a, b) => a + b.amount, 0);
    const expense = txs.filter(t => t.type === "Expense").reduce((a, b) => a + b.amount, 0);
    const balance = income - expense;

    const insight = await getGeminiResponse(
      `Give a money management tip for a person with ₹${balance} balance.`
    );

    res.json({ income, expense, balance, insight });
  } catch (err) {
    res.status(500).json({ error: "Failed to load analytics" });
  }
});

export default router;

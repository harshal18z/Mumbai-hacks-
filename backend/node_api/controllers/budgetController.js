import Budget from "../models/Budget.js";
import { getGeminiResponse } from "../services/geminiClient.js";

export const getBudgetRecommendations = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id });
    const total = budgets.reduce((sum, b) => sum + b.amount, 0);

    const aiTip = await getGeminiResponse(
      `Give a budget improvement tip for a person with total monthly budget ₹${total}`
    );

    res.json({ budgets, aiTip });
  } catch (err) {
    res.status(500).json({ error: "Failed to get budget data" });
  }
};

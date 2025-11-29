import { getGeminiResponse } from "./geminiClient.js";

export async function generateBudgetAdvice(userBudgets) {
  try {
    const total = userBudgets.reduce((sum, b) => sum + b.amount, 0);
    const overspent = userBudgets.filter(b => b.spent > b.amount);
    const prompt = `
    The user has a total budget of ₹${total}.
    Overspent in ${overspent.map(b => b.category).join(", ") || "none"}.
    Suggest 2 smart ways to save more efficiently.
    `;
    return await getGeminiResponse(prompt);
  } catch (err) {
    console.error("Budget Advice Error:", err);
    return "Unable to generate budget advice.";
  }
}

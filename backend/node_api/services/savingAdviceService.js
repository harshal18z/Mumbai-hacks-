import { getGeminiResponse } from "./geminiClient.js";

export async function generateSavingsAdvice(savingsPlans) {
  try {
    const saved = savingsPlans.reduce((s, p) => s + p.savedAmount, 0);
    const target = savingsPlans.reduce((s, p) => s + p.targetAmount, 0);
    const progress = ((saved / target) * 100).toFixed(1);

    const prompt = `
    The user has saved ₹${saved} out of ₹${target} (${progress}%).
    Suggest one motivational tip to reach savings goals faster.
    `;

    return await getGeminiResponse(prompt);
  } catch (err) {
    console.error("Savings Advice Error:", err);
    return "Unable to fetch AI savings advice.";
  }
}

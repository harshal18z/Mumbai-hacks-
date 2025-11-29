// controllers/savingsController.js
import fetch from "node-fetch";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PYTHON_AI_URL = process.env.PYTHON_AI_URL || "http://localhost:8000";

// 🚀 Hybrid Smart Savings Recommendation (Python + OpenAI)
export const getHybridSmartSavings = async (req, res) => {
  try {
    const { income, expenses, goals, userProfile } = req.body;

    if (!income || !expenses) {
      return res.status(400).json({ error: "Income and expenses are required." });
    }

    // Step 1️⃣ — Fetch ML insights from Python backend
    const mlResponse = await fetch(`${PYTHON_AI_URL}/savings-advice/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ income, expenses, goals, userProfile }),
    });

    const mlData = await mlResponse.json();

    if (!mlResponse.ok) {
      console.error("⚠️ Python AI Error:", mlData);
      return res.status(500).json({ error: "Python AI service unavailable" });
    }

    // Step 2️⃣ — Send ML results to OpenAI for language generation
    const openaiPrompt = `
You are PaisaPath, a friendly Indian AI financial coach.

User profile: ${JSON.stringify(userProfile)}
Income: ₹${income}
Expenses: ${JSON.stringify(expenses)}
Goals: ${goals?.join(", ") || "Not specified"}

The ML model found these insights:
${JSON.stringify(mlData, null, 2)}

Write 3 personalized saving tips for this user in JSON format:
{
  "summary": "short overview",
  "recommendations": ["tip1", "tip2", "tip3"]
}
`;

    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a smart, motivating financial advisor named PaisaPath." },
          { role: "user", content: openaiPrompt },
        ],
      }),
    });

    const aiData = await aiResponse.json();

    if (!aiResponse.ok) {
      console.error("OpenAI Error:", aiData);
      return res.status(500).json({ error: "OpenAI service failed." });
    }

    // Try parsing OpenAI output safely
    let finalOutput;
    try {
      finalOutput = JSON.parse(aiData.choices[0].message.content);
    } catch {
      finalOutput = { summary: "Here are your AI savings insights:", recommendations: [aiData.choices[0].message.content] };
    }

    // Step 3️⃣ — Merge and respond
    res.json({
      source: "hybrid",
      mlInsights: mlData,
      aiSummary: finalOutput.summary,
      aiRecommendations: finalOutput.recommendations,
    });
  } catch (error) {
    console.error("💥 Hybrid Smart Savings Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

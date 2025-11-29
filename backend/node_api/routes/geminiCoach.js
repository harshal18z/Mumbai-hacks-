import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Initialize Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  try {
    const { message, userContext } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required." });
    }

    // Build Prompt
    const prompt = `
      You are PaisaPath, an empathetic and practical AI finance coach.
      User: ${message}
      Context: ${JSON.stringify(userContext || {})}
    `;

    // IMPORTANT: Use only valid models
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",   // <--- THIS FIXES YOUR ERROR
    });

    const result = await model.generateContent(prompt);

    res.json({
      reply: result.response.text(),
    });

  } catch (err) {
    console.error("❌ Gemini API Error:", err);

    res.status(500).json({
      reply: "⚠ Unable to reach Gemini AI. Check API key or model name.",
    });
  }
});

export default router;

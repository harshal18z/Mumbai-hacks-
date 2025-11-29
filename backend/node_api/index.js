// ======================================
// 🌱 Environment & Dependencies
// ======================================
import dotenv from "dotenv";
dotenv.config(); // MUST load before anything else

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import connectDB from "./config/db.js";

// ======================================
// ⚙️ App Setup
// ======================================
const app = express();
const PORT = process.env.PORT || 5000;

// Check Gemini Key
console.log("🔑 GEMINI_API_KEY Loaded?", process.env.GEMINI_API_KEY ? "YES" : "NO");

// ======================================
// 🧩 Middleware
// ======================================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://paisapath.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ======================================
// 🗄️ Database Connection
// ======================================
connectDB();

// ======================================
// 📦 Import Routes
// ======================================
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import savingsRoutes from "./routes/savingsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import walletRoutes from "./routes/wallet.js";
import getDataRoute from "./routes/getData.js";

// Gemini AI Coach Route
import geminiCoachRoute from "./routes/geminiCoach.js";

// ======================================
// 🧭 Use Routes
// ======================================
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/budget", budgetRoutes);
app.use("/api/v1/savings", savingsRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/analyze", getDataRoute);

// ⭐ AI Finance Coach (Gemini)
app.use("/api/v1/ai/gemini", geminiCoachRoute);

// ======================================
// 📊 Expense Quick Analysis (Local AI)
// ======================================
app.post("/api/v1/ai/expense-summary", (req, res) => {
  const { question, description, expenses, goal } = req.body;

  if (!question || !description || !expenses || typeof expenses !== "object") {
    return res.status(400).json({ error: "Invalid request data" });
  }

  const totalSpent = Object.values(expenses).reduce((sum, val) => sum + val, 0);
  const advice =
    totalSpent > goal
      ? "You're spending more than your goal — try cutting back next month."
      : "You're within your goal. Great job!";

  res.json({ totalSpent, advice });
});

// ======================================
// 🔗 Python AI Microservice (Optional)
// ======================================
app.post("/api/v1/ai/advanced-analysis", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8000/analyze-finance/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("💥 Python AI Service Error:", err.message);
    res.status(500).json({ error: "Python AI service not reachable." });
  }
});

// ======================================
// 🏠 Root Endpoint
// ======================================
app.get("/", (req, res) => {
  res.send("✅ PaisaPath Backend (Node + Gemini AI Coach) is running!");
});

// ======================================
// 🚀 Start the Server
// ======================================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

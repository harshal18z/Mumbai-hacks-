import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Flame, PlusCircle, Lightbulb, Award, Leaf } from "lucide-react";
import Confetti from "react-confetti";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SmartSavings({ transactions = [], totalIncome = 0, totalExpense = 0 }) {
  const [aiSavings, setAiSavings] = useState([]);
  const [summary, setSummary] = useState("");
  const [quote, setQuote] = useState("");
  const [streak, setStreak] = useState(3);
  const [level, setLevel] = useState("Saver Rookie");
  const [progress, setProgress] = useState(0);
  const [customIdea, setCustomIdea] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const userProfile = { name: "Vaishnavi", occupation: "Student" };

  // ---------------------------
  // 💡 Dynamic Progress Calculation
  // ---------------------------
  useEffect(() => {
    const savingRatio = totalIncome ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
    const progressValue = Math.min(Math.max(savingRatio, 0), 100);
    setProgress(progressValue.toFixed(1));

    if (savingRatio > 50) setLevel("Wealth Warrior");
    else if (savingRatio > 25) setLevel("Saver Pro");
    else setLevel("Saver Rookie");
  }, [totalIncome, totalExpense]);

  // ---------------------------
  // 🤖 Fetch AI-generated savings ideas
  // ---------------------------
  const fetchAISavings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/savings/hybrid-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          income: totalIncome,
          expenses: { totalExpense },
          goals: ["Emergency Fund", "New Laptop"],
          userProfile,
        }),
      });
      const data = await res.json();
      if (data?.aiRecommendations) {
        setAiSavings(data.aiRecommendations);
        setSummary(data.aiSummary);
      }
    } catch (err) {
      console.error("AI fetch failed:", err);
    }
  };

  // ---------------------------
  // 🌿 Fetch AI Motivation Quote
  // ---------------------------
  const fetchMotivation = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/motivation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ occupation: userProfile.occupation }),
      });
      const data = await res.json();
      setQuote(data.quote || "Small habits create big change 🌱");
    } catch {
      setQuote("Keep saving! Every rupee counts 💚");
    }
  };

  // ---------------------------
  // ⚡ Trigger Confetti on Level-Up
  // ---------------------------
  useEffect(() => {
    if (progress >= 75) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000);
    }
  }, [progress]);

  useEffect(() => {
    fetchAISavings();
    fetchMotivation();
  }, []);

  // ---------------------------
  // ➕ Add Custom Saving Idea
  // ---------------------------
  const addCustomIdea = () => {
    if (customIdea.trim()) {
      setAiSavings((prev) => [...prev, customIdea]);
      setCustomIdea("");
    }
  };

  // ---------------------------
  // 🌈 UI Section
  // ---------------------------
  return (
    <motion.div
      className="p-6 min-h-screen relative"
      style={{ backgroundColor: "#F0F7EC" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#14532D] mb-2">
          🌱 Smart Savings
        </h1>
        <p className="text-[#4C6651] text-lg">
          Personalized AI savings insights for <b>{userProfile.occupation}</b> 🎯
        </p>
      </div>

      {/* XP + Progress Row */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
        {/* 🔥 Streak */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex flex-col items-center bg-[#DFF8C2] border border-[#A8D5BA] rounded-2xl px-6 py-4 shadow-md min-w-[250px]"
        >
          <Flame className="text-[#14532D]" size={28} />
          <p className="font-semibold text-[#14532D] mt-1">Savings Streak</p>
          <p className="text-2xl font-bold text-[#14532D]">{streak} days 🔥</p>
          <span className="text-[#4C6651] text-sm mt-1">{level}</span>
        </motion.div>

        {/* Circular XP Progress */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white border border-[#CCE7D0] rounded-2xl shadow-md px-8 py-6 flex flex-col items-center justify-center w-[230px]"
        >
          <div style={{ width: 120, height: 120 }}>
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                textColor: "#14532D",
                pathColor: "#4CAF50",
                trailColor: "#E5F5E0",
              })}
            />
          </div>
          <p className="text-[#14532D] font-semibold mt-4">
            Weekly Savings Progress
          </p>
        </motion.div>
      </div>

      {/* Achievements */}
      <div className="flex justify-center gap-3 mb-6">
        {progress > 10 && (
          <span className="px-3 py-1 bg-[#E5F5E0] text-[#14532D] rounded-full">
            🥇 Beginner Saver
          </span>
        )}
        {progress > 35 && (
          <span className="px-3 py-1 bg-[#DFF8C2] text-[#14532D] rounded-full">
            💰 Consistent Planner
          </span>
        )}
        {progress > 65 && (
          <span className="px-3 py-1 bg-[#A8D5BA] text-[#14532D] rounded-full">
            🌟 Wealth Warrior
          </span>
        )}
      </div>

      {/* AI Summary */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-6 bg-gradient-to-r from-[#EAF8E4] to-[#F5F9E6] border border-[#B4D6A8] p-5 rounded-2xl shadow-md"
        >
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="text-[#14532D]" />
            <h2 className="text-[#14532D] font-semibold text-lg">
              💡 AI Insight
            </h2>
          </div>
          <p className="text-[#3F5D43] text-base leading-relaxed">{summary}</p>
        </motion.div>
      )}

      {/* AI Recommendations */}
      <div className="max-w-3xl mx-auto space-y-4">
        {aiSavings.length > 0 ? (
          aiSavings.map((idea, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 bg-white border border-[#CCE7D0] hover:shadow-lg transition rounded-2xl p-4"
            >
              <div className="bg-[#E5F7E0] p-3 rounded-full">
                <Leaf className="text-[#14532D]" size={22} />
              </div>
              <div>
                <p className="text-[#14532D] font-semibold text-lg">{idea}</p>
                <p className="text-[#4C6651] text-sm mt-1">
                  Generated by PaisaPath AI
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-[#4C6651] italic">
            No recommendations yet. Start saving to get AI insights 🌱
          </p>
        )}
      </div>

      {/* Add Custom Idea */}
      <div className="flex justify-center mt-10">
        <input
          type="text"
          placeholder="💭 Add your own savings idea..."
          value={customIdea}
          onChange={(e) => setCustomIdea(e.target.value)}
          className="px-4 py-3 rounded-l-xl border border-[#A8D5BA] w-96 focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] bg-white/90"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addCustomIdea}
          className="px-5 py-3 bg-gradient-to-r from-[#81C784] to-[#A5D6A7] text-[#14532D] rounded-r-xl flex items-center gap-1 font-semibold shadow-md"
        >
          <PlusCircle size={18} />
          Add
        </motion.button>
      </div>

      {/* Motivational Quote */}
      <div className="max-w-2xl mx-auto mt-8 bg-[#F5F9E6] border border-[#A8D5BA] rounded-xl p-4 text-center text-[#14532D] italic">
        “{quote}”
      </div>

      <p className="text-center mt-6 text-[#4C6651] text-sm">
        🌿 Keep up your savings streak. Every small step builds your wealth.
      </p>
    </motion.div>
  );
}

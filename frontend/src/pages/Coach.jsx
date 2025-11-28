import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Bot, User, Sparkles } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

export default function Coach() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const scrollRef = useRef(null);

  // Gemini SDK init
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  // -----------------------------
  // 🔹 Load User from Backend
  // -----------------------------
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`${API_BASE}/api/v1/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("User Load Error:", err);
      }
    };
    fetchUser();
  }, []);

  // -----------------------------
  // 🔹 Suggested Prompts
  // -----------------------------
  const suggestionSets = {
    Student: [
      "How can I manage my pocket money?",
      "Should I start investing as a student?",
      "Best budgeting tips for college?",
    ],
    Employee: [
      "How can I save more salary?",
      "Help me build a budget.",
      "What percentage should I invest?",
    ],
    Business: [
      "How to improve business cash flow?",
      "Should I separate personal & business finances?",
      "How much emergency fund do I need?",
    ],
    Other: [
      "How do I start saving?",
      "Explain the 50/30/20 rule.",
      "How do I cut unnecessary expenses?",
    ],
  };

  const quickPrompts = user
    ? suggestionSets[user.occupation] || suggestionSets["Other"]
    : suggestionSets["Other"];

  // -----------------------------
  // 🔹 Load Saved Chat
  // -----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("aiCoachMessages");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([
        {
          role: "ai",
          text: `👋 Hi${user?.name ? " " + user.name : ""}! I'm your Finance Coach. How can I help you today?`,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [user]);

  // Auto-save + scroll
  useEffect(() => {
    localStorage.setItem("aiCoachMessages", JSON.stringify(messages));
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // -----------------------------
  // 🔹 Typewriter Animation
  // -----------------------------
  const typeMessage = async (text) => {
    let i = 0;
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setMessages((prev) => {
          if (!prev.length) return prev;
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last.role === "ai") {
            last.text = text.slice(0, i);
          }
          return copy;
        });
        i++;
        if (i > text.length) {
          clearInterval(interval);
          resolve();
        }
      }, 12);
    });
  };

  // -----------------------------
  // 🔹 SEND MESSAGE (Gemini + Markdown)
  // -----------------------------
  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      role: "user",
      text: chatInput,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setLoading(true);

    try {
const systemInstruction = `You are a practical personal finance coach with expertise in budgeting, debt management, and financial planning.

CORE PRINCIPLES:
- Base advice on established financial principles (50/30/20 rule, debt avalanche/snowball, emergency funds, etc.)
- When you don't have specific information, explicitly state your assumptions
- Never invent financial products, interest rates, or tax rules
- Admit uncertainty rather than guess

STYLE:
- Be direct but conversational
- Use specific numbers only when citing known rules of thumb
- Explain the "why" briefly, not just the "what"
- Avoid both extremes: no wall-of-text explanations, but also no oversimplified one-liners

FORMAT (markdown):
1. **Quick Take** – 2-3 sentences that capture the essence and main direction
2. **What To Do** – 3-5 concrete, actionable points with brief context
3. **Common Pitfall** – one mistake to avoid (if relevant)

CONTENT RULES:
- Use proven frameworks: emergency fund (3-6 months expenses), high-interest debt first, employer 401k match, etc.
- For ${user?.occupation || "your situation"}: give relevant context when you can, but don't force occupation-specific advice
- If data is missing, say "Assuming..." or "In typical cases..." then proceed
- Never recommend specific investments, stocks, crypto, or insurance products
- Don't cite specific tax rates or laws without noting they vary by location/year
- For questions needing context, ask ONE focused question if absolutely necessary, otherwise make reasonable assumptions

AVOIDING HALLUCINATION:
- Don't invent statistics unless they're widely-known benchmarks
- Don't claim expertise in licensed areas (tax prep, legal advice, securities)
- If uncertain, use phrases like "typically recommended" or "standard approach" rather than absolutes
- When giving ranges or percentages, only use those from established financial guidelines

User: ${user?.name || "there"}
Respond in markdown only.`;

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction,
      });

      const history = messages.map((m) => ({
        role: m.role === "ai" ? "model" : "user",
        parts: [{ text: m.text }],
      }));

      const chat = model.startChat({
        history,
        generationConfig: { maxOutputTokens: 1200},
        temperature: 1.0,
      });

      const result = await chat.sendMessage(userMessage.text);
      const aiText = result.response.text(); // <- will be markdown

      // Placeholder AI msg for typing effect
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "", time: new Date().toLocaleTimeString() },
      ]);

      await typeMessage(aiText);
    } catch (err) {
      console.error("Gemini Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            "⚠️ Something broke — check your Gemini API key, billing, or network and try again.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // -----------------------------
  // 🔹 CLEAR CHAT
  // -----------------------------
  const clearChat = () => {
    const msg = {
      role: "ai",
      text: "🧹 Chat cleared — ready when you are.",
      time: new Date().toLocaleTimeString(),
    };
    setMessages([msg]);
    localStorage.setItem("aiCoachMessages", JSON.stringify([msg]));
  };

  // -----------------------------
  // 🔹 UI
  // -----------------------------
  return (
    <div className="flex flex-col h-screen p-6 bg-gradient-to-br from-[#E8F5E9] to-[#F1FAF3]">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/80 px-6 py-4 rounded-xl shadow border border-[#d6e9d9]">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-[#14532D]">
          <Bot size={26} /> Finance Coach
        </h1>
        <button
          onClick={clearChat}
          className="text-sm bg-[#c9f3d6] px-4 py-2 rounded-lg hover:bg-[#a8e8be]"
        >
          Clear Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 mt-6 p-6 bg-white/60 rounded-2xl overflow-y-auto border border-[#cfe8d4] flex flex-col gap-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 max-w-[75%] rounded-2xl shadow-sm ${
              msg.role === "user"
                ? "self-end bg-[#d4f1ff] text-[#003f66]"
                : "self-start bg-[#e8f5e9] text-[#14532D]"
            }`}
          >
            <div className="flex gap-2 items-start">
              {msg.role === "ai" ? <Bot size={18} /> : <User size={18} />}
              {msg.role === "ai" ? (
                <div className="markdown-body">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>

              ) : (
                <span className="text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </span>
              )}
            </div>
            <span className="block text-[10px] opacity-60 mt-1 text-right">
              {msg.time}
            </span>
          </motion.div>
        ))}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center text-[#14532D] gap-2"
          >
            <Sparkles className="animate-pulse" size={16} /> Thinking...
          </motion.div>
        )}

        <div ref={scrollRef}></div>
      </div>

      {/* Input */}
      <div className="mt-4 flex flex-col gap-3">
        {/* Quick prompts */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => setChatInput(q)}
              className="px-4 py-1 whitespace-nowrap border border-[#cfe8d4] rounded-full bg-white text-xs md:text-sm text-[#14532D] hover:bg-[#e8f5e9]"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Text Area */}
        <div className="flex gap-3 bg-white/80 p-4 rounded-xl border border-[#d6e9d9]">
          <textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask your coach anything…"
            className="flex-1 resize-none p-2 outline-none bg-transparent text-[#14532D]"
            rows={2}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-6 bg-[#2e8d55] text-white rounded-lg hover:bg-[#1f6f44] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

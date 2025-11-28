import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import useProfile from "../hooks/useProfile";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard({ transactions = [] }) {
  const { occupation, name } = useProfile();

  const insights = {
    Student: "Plan weekend spending early — avoid mid-week shortage 🎒",
    Employee: "Auto-save right after salary credit for stress-free month 💼",
    Business: "Track weekly cash flow to maintain runway 📊",
    Other: "Small daily steps → big financial progress 🌱",
  };

  const greeting = {
    Student: "Study Smart, Spend Smart 🎓",
    Employee: "Building Financial Stability 💼",
    Business: "Growing Strong 💹",
    Other: "You're Doing Great 🌿",
  };

  const [cashFlow, setCashFlow] = useState(() => {
    const saved = localStorage.getItem("cashFlow");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ ADD CASH FLOW FORM STATE HERE
  const [newPoint, setNewPoint] = useState({
    day: "",
    balance: "",
    spending: "",
    savings: "",
  });

  const [range, setRange] = useState("week");

  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("goals");
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  const totalIncome = useMemo(
    () => transactions.filter(t => t.type === "Income").reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () => transactions.filter(t => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const currentBalance = totalIncome - totalExpense;

  // ✅ Add cash flow point handler
  const handleAddPoint = (e) => {
    e.preventDefault();
    if (!newPoint.day) return;

    const point = {
      day: newPoint.day,
      Balance: Number(newPoint.balance) || 0,
      Spending: Number(newPoint.spending) || 0,
      Savings: Number(newPoint.savings) || 0,
    };

    setCashFlow((prev) => [...prev, point]);
    localStorage.setItem("cashFlow", JSON.stringify([...cashFlow, point]));

    setNewPoint({ day: "", balance: "", spending: "", savings: "" });
  };

  return (
    <motion.div
      className="space-y-8 p-8 min-h-screen"
      style={{ backgroundColor: "#F0F7EC" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >

      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-[#CCE7D0]">
          <h2 className="text-[#3E7C59] font-medium">Current Balance</h2>
          <p className="text-4xl font-bold mt-2">₹{currentBalance.toLocaleString("en-IN")}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-[#CCE7D0] text-center">
          <h2 className="text-[#3E7C59] font-medium">AI Insight of the Day</h2>
          <p className="text-[#5B7A67] mt-2">{insights[occupation] || insights.Other}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-[#CCE7D0]">
          <h2 className="text-[#3E7C59] font-medium mb-3">Your Goals 🎯</h2>
          {goals.length ? (
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {goals.map(goal => (
                <div key={goal.id} className="min-w-[130px] bg-[#F5F9E6] p-3 rounded-xl border border-[#CCE7D0]">
                  <p className="text-sm font-medium text-[#3E7C59]">{goal.name}</p>
                  <p className="text-xs text-[#5B7A67]">{goal.saved} / {goal.target}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#5B7A67]">No goals yet — create one 🎯</p>
          )}
        </div>
      </div>


      {/* ➕ Add Cash Flow Form */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-[#CCE7D0]">
        <h2 className="text-xl font-semibold text-[#3E7C59] mb-4">Add Cash Flow Point</h2>

        <form onSubmit={handleAddPoint} className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <input
            type="text"
            placeholder="Day (Mon)"
            value={newPoint.day}
            onChange={(e) => setNewPoint({ ...newPoint, day: e.target.value })}
            className="px-3 py-2 border rounded-lg border-[#CCE7D0] focus:ring-2 focus:ring-[#86C8A7]"
          />
          <input
            type="number"
            placeholder="Balance"
            value={newPoint.balance}
            onChange={(e) => setNewPoint({ ...newPoint, balance: e.target.value })}
            className="px-3 py-2 border rounded-lg border-[#CCE7D0] focus:ring-2 focus:ring-[#86C8A7]"
          />
          <input
            type="number"
            placeholder="Spending"
            value={newPoint.spending}
            onChange={(e) => setNewPoint({ ...newPoint, spending: e.target.value })}
            className="px-3 py-2 border rounded-lg border-[#CCE7D0] focus:ring-2 focus:ring-[#86C8A7]"
          />
          <input
            type="number"
            placeholder="Savings"
            value={newPoint.savings}
            onChange={(e) => setNewPoint({ ...newPoint, savings: e.target.value })}
            className="px-3 py-2 border rounded-lg border-[#CCE7D0] focus:ring-2 focus:ring-[#86C8A7]"
          />
          <button className="px-4 py-2 bg-[#A8D5BA] text-[#14532D] rounded-lg hover:bg-[#8CCF9C] transition font-medium">
            Add
          </button>
        </form>
      </div>


      {/* 📈 Cash Flow Trend */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-[#CCE7D0]">
        <h2 className="text-xl font-semibold text-[#3E7C59] mb-4">Cash Flow Trend</h2>

        {cashFlow.length ? (
          <ResponsiveContainer width="100%" height={330}>
            <LineChart data={cashFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#DDEEDB" />
              <XAxis dataKey="day" stroke="#3E7C59" />
              <YAxis stroke="#3E7C59" />
              <Tooltip />
              <Line type="monotone" dataKey="Balance" stroke="#3E7C59" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="Spending" stroke="#ECA869" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Savings" stroke="#6CC8A4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-[#5B7A67] italic text-center py-6">
            No cash flow data yet. Add some above 👆
          </p>
        )}
      </div>

    </motion.div>
  );
}

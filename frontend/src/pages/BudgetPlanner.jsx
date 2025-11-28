import React, { useEffect, useMemo, useState } from "react";
import useProfile from "../hooks/useProfile";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import {
  Utensils,
  Car,
  ShoppingBag,
  Clapperboard,
  Receipt,
  PiggyBank,
  Sparkles,
  HeartPulse,
  Palette,
} from "lucide-react";

const COLORS = ["#3E7C59", "#6CC8A4", "#F7C8A0", "#A8D5BA", "#81C784", "#D4EBD3"];

const CATEGORY_META = [
  { key: "Food", icon: Utensils },
  { key: "Transport", icon: Car },
  { key: "Shopping", icon: ShoppingBag },
  { key: "Entertainment", icon: Clapperboard },
  { key: "Bills", icon: Receipt },
  { key: "Savings", icon: PiggyBank },
];

const BASELINES = {
  Student:   { Food: 25, Transport: 10, Shopping: 15, Entertainment: 15, Bills: 15, Savings: 20 },
  Employee:  { Food: 20, Transport: 10, Shopping: 10, Entertainment: 10, Bills: 25, Savings: 25 },
  Business:  { Food: 15, Transport: 10, Shopping: 10, Entertainment: 10, Bills: 30, Savings: 25 },
  Other:     { Food: 20, Transport: 10, Shopping: 10, Entertainment: 10, Bills: 25, Savings: 25 },
};

// High-level preset philosophies (sum to 100)
const PRESETS = {
  Balanced:   { Food: 20, Transport: 10, Shopping: 12, Entertainment: 13, Bills: 20, Savings: 25 },
  SaveMore:   { Food: 18, Transport: 9,  Shopping: 8,  Entertainment: 10, Bills: 20, Savings: 35 },
  Lifestyle:  { Food: 22, Transport: 10, Shopping: 15, Entertainment: 18, Bills: 15, Savings: 20 },
};

// Slightly emphasize a category by +6% and reduce others proportionally (no sliders/inputs)
function emphasize(allocation, focusKey, bump = 6) {
  const current = allocation[focusKey];
  const cap = 50; // don’t let one category dominate too much
  const newFocus = Math.min(cap, current + bump);
  const delta = newFocus - current;
  if (delta <= 0) return allocation;

  const others = Object.keys(allocation).filter((k) => k !== focusKey);
  const otherTotal = others.reduce((a, k) => a + allocation[k], 0);
  if (otherTotal <= 0) return allocation;

  const next = { ...allocation, [focusKey]: newFocus };
  others.forEach((k) => {
    const share = allocation[k] / otherTotal;
    next[k] = Math.max(0, allocation[k] - delta * share);
  });

  // Normalize to 100 (minor floating rounding)
  const total = Object.values(next).reduce((a, b) => a + b, 0);
  const factor = 100 / total;
  Object.keys(next).forEach((k) => (next[k] = Math.round(next[k] * factor)));
  // Fix rounding drift
  const drift = 100 - Object.values(next).reduce((a, b) => a + b, 0);
  if (drift !== 0) {
    // adjust the largest slice minimally
    const largest = Object.entries(next).sort((a, b) => b[1] - a[1])[0][0];
    next[largest] += drift;
  }
  return next;
}

export default function BudgetPlanner() {
  const { occupation } = useProfile();
  const baseline = BASELINES[occupation] || BASELINES.Other;

  const [alloc, setAlloc] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? JSON.parse(saved) : baseline;
  });
  const [message, setMessage] = useState("");

  // Persist
  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(alloc));
  }, [alloc]);

  // Data for donut
  const data = useMemo(
    () =>
      CATEGORY_META.map(({ key }) => ({
        name: key,
        value: Math.max(0, Math.round(alloc[key] || 0)),
      })),
    [alloc]
  );

  const total = useMemo(() => Object.values(alloc).reduce((a, b) => a + b, 0), [alloc]);

  const applyPreset = (name) => {
    const preset = PRESETS[name];
    if (!preset) return;
    setAlloc(preset);
  };

  const handleCardClick = (key) => {
    setAlloc((prev) => emphasize(prev, key, 6));
  };

  const save = () => {
    if (total !== 100) {
      setMessage("⚠ Total must be exactly 100% to save.");
      return;
    }
    setMessage("✅ Budget saved successfully.");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: "#F0F7EC" }}>
      <h1 className="text-3xl font-bold text-[#14532D] text-center mb-6">Budget Planner</h1>

      {/* Presets */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => applyPreset("Balanced")}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#CDEACC] hover:bg-[#F5F9E6] transition"
        >
          <Palette size={18} className="text-[#3E7C59]" /> Balanced
        </button>
        <button
          onClick={() => applyPreset("SaveMore")}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#CDEACC] hover:bg-[#F5F9E6] transition"
        >
          <Sparkles size={18} className="text-[#3E7C59]" /> Save More
        </button>
        <button
          onClick={() => applyPreset("Lifestyle")}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#CDEACC] hover:bg-[#F5F9E6] transition"
        >
          <HeartPulse size={18} className="text-[#3E7C59]" /> Lifestyle
        </button>
      </div>

      {/* Donut + Legend */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow border border-[#CDEACC]">
          <div className="h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={140}
                  paddingAngle={1}
                  isAnimationActive
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-lg mt-2 text-[#14532D] font-semibold">
            Total:{" "}
            <span className={total === 100 ? "text-green-600" : "text-red-600"}>
              {total}%
            </span>
          </p>
        </div>

        {/* Category Cards (click to emphasize) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORY_META.map(({ key, icon: Icon }, i) => (
            <button
              key={key}
              onClick={() => handleCardClick(key)}
              className="text-left bg-white p-5 rounded-2xl shadow border border-[#CDEACC] hover:bg-[#F5F9E6] transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Icon size={22} className="text-[#3E7C59]" />
                  <span className="text-[#14532D] font-semibold">{key}</span>
                </div>
                <span className="text-[#14532D] font-semibold">{alloc[key]}%</span>
              </div>
              <div className="w-full bg-[#E0F2D6] h-2 rounded-full">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${alloc[key]}%`,
                    backgroundColor: COLORS[i % COLORS.length],
                    transition: "width 200ms ease",
                  }}
                />
              </div>
              <p className="text-xs text-[#556B5A] mt-2">
                Tap to emphasize {key} (smart rebalance, no typing).
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      {message && (
        <p className="text-center mt-4 text-[#3E7C59] font-medium">{message}</p>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={save}
          className={`px-6 py-3 rounded-xl text-white text-lg transition ${
            total === 100 ? "bg-[#3E7C59] hover:bg-[#2E6446]" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Save Budget
        </button>
      </div>
    </div>
  );
}

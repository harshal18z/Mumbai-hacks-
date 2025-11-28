import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const [month, setMonth] = useState("November 2025");

  const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");

  // Group expenses by category
  const categoryData = useMemo(() => {
    const totals = {};
    transactions.forEach((t) => {
      if (t.type === "Expense") {
        totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
      }
    });
    return Object.keys(totals).map((cat) => ({
      name: cat,
      value: totals[cat],
    }));
  }, [transactions]);

  const COLORS = ["#6CC8A4", "#A3D9A5", "#81C784", "#3E7C59", "#F7C8A0"];

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const savingsRate = totalIncome
    ? ((totalIncome - totalExpense) / totalIncome) * 100
    : 0;

  const topCategory = categoryData.length
    ? categoryData.sort((a, b) => b.value - a.value)[0].name
    : "N/A";

  // ✅ Financial Health Score
  const healthScore = Math.min(Math.max(Math.round(savingsRate), 0), 100);

  const getBadge = () => {
    if (healthScore >= 70) return { text: "Saver Champion 🥇", color: "#3E7C59" };
    if (healthScore >= 40) return { text: "Smart Planner 🥈", color: "#81C784" };
    return { text: "Keep Improving 🥉", color: "#F7C8A0" };
  };

  const badge = getBadge();

  // ✅ AI Summary Insight
  const insight = (() => {
    if (savingsRate > 50)
      return "Excellent month! Your savings rate is strong — keep building wealth consistently 💚";
    if (savingsRate > 30)
      return "Good job balancing income and expenses. Try reducing impulse buys to improve savings further.";
    return "This month your expenses exceeded healthy limits. Try weekly spending caps & avoid non-essential purchases.";
  })();

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#F0F7EC" }}>
      <h1 className="text-3xl font-bold text-[#3E7C59] mb-6">Reports</h1>

      {/* Month Selector */}
      <div className="bg-[#F5F9E6] p-6 rounded-xl shadow border border-[#A8D5BA] max-w-lg">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option>November 2025</option>
          <option>December 2025</option>
          <option>January 2026</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8">

        <div className="bg-white shadow rounded-lg p-5 border border-[#A8D5BA]">
          <p className="text-sm text-gray-600">Total Income</p>
          <p className="text-3xl font-bold text-[#3E7C59]">
            ₹{totalIncome.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border border-[#A8D5BA]">
          <p className="text-sm text-gray-600">Total Expense</p>
          <p className="text-3xl font-bold text-red-600">
            ₹{totalExpense.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border border-[#A8D5BA]">
          <p className="text-sm text-gray-600">Savings Rate</p>
          <p className="text-3xl font-bold text-[#3E7C59]">
            {savingsRate.toFixed(1)}%
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-5 border border-[#A8D5BA]">
          <p className="text-sm text-gray-600">Top Category</p>
          <p className="text-3xl font-bold text-[#3E7C59]">{topCategory}</p>
        </div>
      </div>

      {/* ✅ PIE CHART + HEALTH SCORE SIDE-BY-SIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        {/* Spending Breakdown */}
        <div className="bg-white shadow p-6 rounded-xl border border-[#A8D5BA]">
          <h2 className="text-lg font-semibold text-[#3E7C59] mb-4">
            Spending Breakdown
          </h2>

          <div className="flex items-center gap-6">
            {/* Donut Chart */}
            <div className="w-1/2">
              <ResponsiveContainer width="100%" height={230}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Category Breakdown */}
            <div className="w-1/2 space-y-2">
              {categoryData.map((c, index) => {
                const percent = totalExpense
                  ? ((c.value / totalExpense) * 100).toFixed(1)
                  : 0;

                return (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></span>
                      {c.name}
                    </span>

                    <span className="text-[#3E7C59] font-medium">
                      ₹{c.value.toLocaleString("en-IN")} ({percent}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Health Score */}
        <div className="bg-white shadow p-6 rounded-xl border border-[#A8D5BA] flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-[#3E7C59] mb-2">
            Your Financial Health Score
          </h2>

          <p className="text-5xl font-bold text-[#3E7C59]">{healthScore}/100</p>

          <p
            className="mt-3 inline-block px-4 py-2 rounded-lg text-white font-semibold"
            style={{ backgroundColor: badge.color }}
          >
            {badge.text}
          </p>

          <p className="text-[#556B5A] mt-4 text-sm">{insight}</p>
        </div>

      </div>

      {/* Download Button */}
      <button className="mt-8 px-6 py-3 bg-[#A8D5BA] text-[#3E7C59] rounded-lg hover:bg-[#8FCFA0] transition">
        Download Report PDF
      </button>
    </div>
  );
}

import React from "react";

export default function BalanceCard({ balance = 0, cashFlow = [], goals = [], palette }) {
  // Safe defaults
  const recentData = cashFlow.slice(-7);
  const forecast =
    recentData.length > 0
      ? recentData.reduce((sum, item) => sum + item.balance, 0) / recentData.length
      : 0;

  const goal = goals[1] || goals[0];
  const progress = goal ? ((goal.saved / goal.target) * 100).toFixed(0) : 0;
  const insight = goal
    ? `You're ${progress}% on track for ${goal.name} 🎯`
    : "Start saving towards your first goal today 💪";

  return (
    <div className="rounded-2xl p-5 shadow-sm bg-white border border-gray-200 transition-all hover:shadow-md">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        {/* Left Section */}
        <div>
          <div className="text-sm text-gray-500">Current Balance</div>
          <div
            className="text-3xl font-semibold mt-1"
            style={{ color: palette?.primary || "#0f766e" }}
          >
            ₹{balance.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Forecast (7-day avg):{" "}
            <span className="font-medium text-gray-600">
              ₹{Math.round(forecast).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-right flex-1">
          <div className="text-sm text-gray-500 mb-1">AI Insight of the Day</div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-teal-50 to-white border border-teal-100 shadow-sm">
            <div className="text-sm text-gray-700 leading-snug">{insight}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

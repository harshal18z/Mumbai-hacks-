import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function CashFlowChart({ cashFlow = [], palette = {} }) {
  if (!Array.isArray(cashFlow) || cashFlow.length === 0) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-sm text-center text-gray-500">
        No cash flow data yet 📊
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border">
      <h3 className="text-sm font-semibold mb-3 text-gray-700">Cash Flow Trend</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={cashFlow}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="balance"
            stroke={palette.primary || "#0f766e"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

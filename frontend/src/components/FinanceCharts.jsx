import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const FinanceCharts = () => {
  // Example data (you can make this dynamic later)
  const spendingData = [
    { name: "Food", value: 3000 },
    { name: "Transport", value: 1500 },
    { name: "Entertainment", value: 1000 },
    { name: "Bills", value: 2500 },
  ];

  const savingsData = [
    { month: "Jan", amount: 2000 },
    { month: "Feb", amount: 2500 },
    { month: "Mar", amount: 2200 },
    { month: "Apr", amount: 2800 },
  ];

  const balanceData = [
    { month: "Jan", balance: 8000 },
    { month: "Feb", balance: 9500 },
    { month: "Mar", balance: 8700 },
    { month: "Apr", balance: 10200 },
  ];

  const COLORS = ["#FFD166", "#06D6A0", "#EF476F", "#118AB2"];

  return (
    <div className="flex flex-wrap justify-center gap-8 p-6 bg-gray-50 rounded-2xl shadow-md">
      {/* Spending Chart */}
      <div className="w-80 h-80 bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold text-center mb-2 text-gray-700">Spending</h2>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={spendingData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {spendingData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Savings Chart */}
      <div className="w-80 h-80 bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold text-center mb-2 text-gray-700">Savings</h2>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={savingsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#06D6A0" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Balance Chart */}
      <div className="w-80 h-80 bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold text-center mb-2 text-gray-700">Balance</h2>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={balanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="balance" stroke="#118AB2" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceCharts;

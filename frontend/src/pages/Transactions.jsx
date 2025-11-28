import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useProfile from "../hooks/useProfile";
import { CATEGORY_PRESETS } from "../constants/categoryPresets";

const categoryColors = {
  Food: "bg-[#DFF8C2] text-[#14532D]",
  Entertainment: "bg-[#CDEFFF] text-[#1766A0]",
  Utilities: "bg-[#FFE6C7] text-[#A0522D]",
  Income: "bg-[#D0F0C0] text-[#2E7D32]",
};

export default function Transactions({
  transactions,
  addTransaction,
}) {
  const { occupation = "Other" } = useProfile();
  const categories = CATEGORY_PRESETS[occupation] || CATEGORY_PRESETS.Other;

  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: categories[0],
    amount: "",
    type: "Expense",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.description || !formData.amount) return;

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    setFormData({
      date: "",
      description: "",
      category: categories[0],
      amount: "",
      type: "Expense",
    });
  };

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <motion.div
      className="p-6 min-h-screen"
      style={{ backgroundColor: "#F0F7EC" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-3xl font-bold text-[#14532D] mb-6">
        Transactions <span className="text-sm text-[#3E7C59]">({occupation} Mode)</span>
      </h1>

      {/* Summary Cards */}
      <div className="flex flex-wrap gap-4 mb-6">
        <SummaryCard label="Total Income" value={totalIncome} color="text-[#2E7D32]" />
        <SummaryCard label="Total Expense" value={totalExpense} color="text-[#D97706]" />
        <SummaryCard label="Balance" value={balance} color="text-[#14532D]" />
      </div>

      {/* Add Transaction */}
      <div className="bg-[#F5F9E6] rounded-lg shadow p-4 border border-[#A3D9A5] mb-6">
        <h2 className="text-xl font-semibold text-[#14532D] mb-3">Add Transaction</h2>
        <form className="flex flex-wrap gap-3 items-end" onSubmit={handleAddTransaction}>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="px-3 py-2 border rounded flex-1 border-[#A3D9A5]"
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="px-3 py-2 border rounded flex-1 border-[#A3D9A5]"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="px-3 py-2 border rounded w-40 border-[#A5D6A7]"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="₹0.00"
            className="px-3 py-2 border rounded w-28 border-[#A5D6A7]"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="px-3 py-2 border rounded w-32 border-[#A5D6A7]"
          >
            <option>Expense</option>
            <option>Income</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-[#A3D9A5] text-[#14532D] rounded hover:bg-[#81C784] transition"
          >
            Add
          </button>
        </form>
      </div>

      {/* Transaction Table */}
      <TransactionTable transactions={transactions} />
    </motion.div>
  );
}

function SummaryCard({ label, value, color }) {
  return (
    <div className="flex-1 bg-[#F5F9E6] p-4 rounded-lg shadow border border-[#A3D9A5]">
      <p className="text-[#14532D] font-medium">{label}</p>
      <p className={`font-bold text-xl ${color}`}>₹{value.toLocaleString()}</p>
    </div>
  );
}

function TransactionTable({ transactions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#F5F9E6] border-b border-[#A3D9A5]">
          <tr>
            <th className="p-3 text-[#14532D]">Date</th>
            <th className="p-3 text-[#14532D]">Description</th>
            <th className="p-3 text-[#14532D]">Category</th>
            <th className="p-3 text-[#14532D]">Amount</th>
            <th className="p-3 text-[#14532D]">Type</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {transactions.map((t) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="border-b hover:bg-[#E6F8B2]"
              >
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.description}</td>
                <td className={`p-3 text-center rounded-full ${categoryColors[t.category] || "bg-white"}`}>
                  {t.category}
                </td>
                <td className={`p-3 font-bold ${t.type === "Expense" ? "text-[#D97706]" : "text-[#2E7D32]"}`}>
                  ₹{t.amount.toLocaleString()}
                </td>
                <td className="p-3">{t.type}</td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}


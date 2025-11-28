import React from 'react'

export default function QuickActions({ onAddExpense, onAddGoal, onAskAI, onTransfer }) {
  return (
    <div className="flex gap-2">
      <button onClick={onAddExpense} className="px-3 py-2 rounded-lg bg-[#ecfdf7]">Add Expense</button>
      <button onClick={onAddGoal} className="px-3 py-2 rounded-lg bg-[#fef3c7]">Set Goal</button>
      <button onClick={onAskAI} className="px-3 py-2 rounded-lg bg-[#eef2ff]">Ask AI</button>
      <button onClick={onTransfer} className="px-3 py-2 rounded-lg bg-[#d1fae5]">Transfer to Savings</button>
    </div>
  )
}

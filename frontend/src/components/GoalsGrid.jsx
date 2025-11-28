import React from "react";

export default function GoalsGrid({ goals = [], acceptMoveToGoal }) {
  if (!Array.isArray(goals) || goals.length === 0) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-sm text-center text-gray-500">
        No goals yet — start by creating one 🎯
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {goals.map((goal) => (
        <div
          key={goal.id}
          className="p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{goal.name}</div>
              <div className="text-xs text-gray-500">
                ₹{goal.saved} / ₹{goal.target}
              </div>
            </div>
            <button
              onClick={() => acceptMoveToGoal(goal.id, 100)}
              className="px-3 py-1 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Add ₹100
            </button>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div
              className="bg-teal-600 h-2 rounded-full"
              style={{
                width: `${Math.min((goal.saved / goal.target) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

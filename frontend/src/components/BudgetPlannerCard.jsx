export default function BudgetPlanner({ budget, setBudget }) {
  return (
    <div>
      <h3>Budget Planner</h3>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />
    </div>
  );
}

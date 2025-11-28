export default function BudgetSummary({ expenses }) {
  const total = expenses.reduce((a, b) => a + b.amount, 0);

  return (
    <div>
      <h3>Budget Summary</h3>
      <p>Total Spent: ₹{total}</p>
    </div>
  );
}

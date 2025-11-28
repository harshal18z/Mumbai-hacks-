export default function MonthlySpendingChart({ data }) {
  return (
    <div>
      <h3>Monthly Spending Chart</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

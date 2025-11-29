export function summarizeExpenses(transactions) {
  const summary = {};
  transactions.forEach(t => {
    if (t.type === "Expense") {
      summary[t.category] = (summary[t.category] || 0) + t.amount;
    }
  });

  const topCategory = Object.entries(summary).sort((a, b) => b[1] - a[1])[0];
  return {
    summary,
    topCategory: topCategory ? topCategory[0] : "N/A",
  };
}

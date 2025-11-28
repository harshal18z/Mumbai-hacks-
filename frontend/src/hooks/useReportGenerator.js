export default function useReportGenerator() {
  const generateReport = (transactions) => {
    const total = transactions.reduce((a, t) => a + t.amount, 0);
    return { total, count: transactions.length };
  };

  return { generateReport };
}

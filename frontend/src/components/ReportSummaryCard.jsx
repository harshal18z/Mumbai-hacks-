export default function ReportSummary({ report }) {
  return (
    <div>
      <h3>Report Summary</h3>
      <p>Total Transactions: {report.count}</p>
      <p>Total Amount: ₹{report.total}</p>
    </div>
  );
}

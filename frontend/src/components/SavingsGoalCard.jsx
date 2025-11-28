export default function SavingsGoalCard({ goal }) {
  return (
    <div>
      <h3>{goal.title}</h3>
      <p>Target: ₹{goal.target}</p>
      <p>Saved: ₹{goal.saved}</p>
    </div>
  );
}

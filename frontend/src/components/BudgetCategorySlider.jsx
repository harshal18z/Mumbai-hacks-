export default function BudgetAllocationSlider({ category, value, onChange }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="w-32 font-medium">{category}</span>
      <input
        type="range"
        min="0"
        max="100"
        className="w-full mx-3"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="font-semibold">{value}%</span>
    </div>
  );
}

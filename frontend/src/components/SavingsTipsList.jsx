export default function SavingsTipsList({ tips = [] }) {
  return (
    <ul className="space-y-3">
      {tips.map((t, i) => (
        <li key={i} className="border p-3 rounded-lg">
          <b>{t.title}</b>
          <p className="text-sm opacity-70">{t.detail}</p>
        </li>
      ))}
      {!tips.length && (
        <div className="opacity-60 text-sm">No tips available yet</div>
      )}
    </ul>
  );
}

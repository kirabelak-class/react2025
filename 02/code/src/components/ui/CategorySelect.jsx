export default function CategorySelect({ categories, value, onChange }) {
    return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 rounded-xl border border-zinc-300 px-3 bg-white"
    >
      <option value="">Todas las categorías</option>
      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
    </select>
  );
}
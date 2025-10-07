export default function CategorySelect({ categories, value, onChange }) {
  const getValue = (c) => typeof c === "string" ? c : (c?.slug || c?.name || "");
  const getLabel = (c) => typeof c === "string" ? c : (c?.name || c?.slug || "");

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 rounded-xl border border-zinc-300 px-3 bg-white"
    >
      <option value="">Todas las categorías</option>
      {Array.isArray(categories) && categories.filter(Boolean).map((c) => {
        const val = getValue(c);
        const label = getLabel(c);
        return (
          <option key={val} value={val}>{label}</option>
        );
      })}
    </select>
  );
}
export default function Spinner({ label = "Cargando..." }) {
    return (
      <div className="flex items-center gap-2 text-zinc-700">
        <div className="w-5 h-5 rounded-full border-2 border-zinc-300 border-t-sky-600 animate-spin" />
        <span className="text-sm">{label}</span>
      </div>
    );
  }
  
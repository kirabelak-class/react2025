export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onPrev}
        disabled={page <= 1}
        className="h-9 px-3 rounded-lg border border-zinc-300 disabled:opacity-40"
      >
        ← Anterior
      </button>
      <span className="text-sm text-zinc-600">Página {page} / {totalPages}</span>
      <button
        onClick={onNext}
        disabled={page >= totalPages}
        className="h-9 px-3 rounded-lg border border-zinc-300 disabled:opacity-40"
      >
        Siguiente →
      </button>
    </div>
  );
}

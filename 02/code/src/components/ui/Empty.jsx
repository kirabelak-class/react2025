export default function Empty({ title = "Sin datos", helper }) {
    return (
      <div className="text-center py-10">
        <p className="font-semibold text-zinc-800">{title}</p>
        {helper && <p className="text-sm text-zinc-500 mt-1">{helper}</p>}
      </div>
    );
  }
  
export default function ErrorState({ message = "Ocurrió un error", onRetry }) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 font-semibold">x {message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 inline-flex items-center h-9 px-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }
  
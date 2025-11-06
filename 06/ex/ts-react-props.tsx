interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export default function Button({ label, variant = "primary", onClick }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-sky-600 hover:bg-sky-700 text-white"
      : "bg-zinc-200 hover:bg-zinc-300 text-zinc-900";

  return (
    <button
      className={`rounded-lg px-4 py-2 font-medium transition-colors ${styles}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

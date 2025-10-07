export default function Input({ className = "", ...props }) {
    return (
      <input
        className={
          "w-full h-10 rounded-xl border border-zinc-300 px-3 " +
          "bg-white text-zinc-900 placeholder-zinc-400 " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 " +
          className
        }
        {...props}
      />
    );
  }
  
export default function Button({ className = "", ...props }) {
    return (
      <button
        className={
          "inline-flex items-center justify-center h-10 px-4 rounded-xl " +
          "bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 " +
          "disabled:opacity-50 disabled:pointer-events-none " +
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 " +
          className
        }
        {...props}
      />
    );
  }
  
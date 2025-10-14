import ErrorText from "./ErrorText";
export default function Input({ label, error, className = "", ...props }) {
	return (
		<label className="block space-y-1">
			{label && <span className="text-sm text-zinc-700">{label}</span>}
			<input
				className={
					"w-full h-10 rounded-xl border px-3 " +
					(error
						? "border-red-500 focus-visible:ring-red-500 "
						: "border-zinc-300 focus-visible:ring-sky-500 ") +
					"bg-white text-zinc-900 placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-2 " +
					className
				}
				{...props}
			/>
			{error && <ErrorText>{error}</ErrorText>}
		</label>
	);
}

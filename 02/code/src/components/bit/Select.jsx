export default function Select({
	options = [],
	value,
	onChange,
	placeholder = "Selecciona...",
	size = "md",
	variant = "neutral",
	disabled = false,
	className = "",
	...props
}) {
	const sizeMap = {
		sm: "text-sm px-3 py-2",
		md: "text-base px-4 py-3",
		lg: "text-lg px-5 py-4",
	};

	const variantMap = {
		primary: "bg-red-500 text-white",
		secondary: "bg-emerald-500 text-slate-900",
		neutral: "bg-white text-slate-900",
		danger: "bg-red-500 text-white",
	};

	const base =
		"w-full uppercase tracking-[0.02em] border-4 border-black rounded-none " +
		"shadow-[0_6px_0_0_#000] hover:brightness-105 " +
		"focus:outline-none focus:translate-y-[2px] focus:shadow-[0_4px_0_0_#000] " +
		"disabled:opacity-60 disabled:pointer-events-none " +
		"transition-[transform,box-shadow,filter] duration-75 appearance-none pr-10";

	return (
		<div className={`relative inline-block ${className}`}>
			<select
				className={`${base} ${sizeMap[size] ?? ""} ${
					variantMap[variant] ?? ""
				}`}
                disabled={disabled}
                value={value??""}
                onChange={onChange}
                {...props}
			>
                {placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
                {options.map((opt) =>
					typeof opt === "string" ? (
						<option key={opt} value={opt}>
							{opt}
						</option>
					) : (
						<option key={opt.value} value={opt.value} disabled={opt.disabled}>
							{opt.label ?? opt.value}
						</option>
					)
				)}

            </select>
            <svg
				className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
				width="14"
				height="9"
				viewBox="0 0 14 9"
				fill="none"
				aria-hidden="true"
			>
				<path d="M1 1L7 8L13 1" stroke="black" strokeWidth="2" />
			</svg>
		</div>
	);
}

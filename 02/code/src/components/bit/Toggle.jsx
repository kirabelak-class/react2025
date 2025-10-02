export default function Toggle({
	id,
	checked,
	onChange,
	label,
	disabled = false,
	size = "md",          
	variant = "primary",  
	className = "",
	...props
}) {
	const sizeMap = {
		sm: { track: "w-14 h-8", thumb: "w-6 h-6", label: "text-sm" },
		md: { track: "w-16 h-9", thumb: "w-7 h-7", label: "text-base" },
		lg: { track: "w-20 h-10", thumb: "w-9 h-9", label: "text-lg" },
	}[size];

	const checkedBg = {
		primary: "peer-checked:bg-orange-500",
		secondary: "peer-checked:bg-emerald-500",
		danger: "peer-checked:bg-red-500",
		neutral: "peer-checked:bg-white",
	}[variant];

	return (
		<label htmlFor={id} className={`inline-flex items-center gap-3 select-none ${className}`}>
			<input
				id={id}
				type="checkbox"
				className="peer sr-only"
				checked={checked}
				onChange={onChange}
				disabled={disabled}
				role="switch"
				aria-checked={checked}
				{...props}
			/>
			<span
				className={[
					"relative inline-flex items-center px-1",
					"border-4 border-black rounded-none bg-white",
					"shadow-[6px_6px_0_0_#000] transition-[transform,box-shadow,filter] duration-75",
					"peer-hover:brightness-105",
					"peer-active:translate-x-[2px] peer-active:translate-y-[2px] peer-active:shadow-[4px_4px_0_0_#000]",
					"peer-disabled:opacity-60 peer-disabled:pointer-events-none",
					"justify-start peer-checked:justify-end",
					sizeMap.track,
					checkedBg,
				].join(" ")}
				aria-hidden="true"
			>
				<span
					className={[
						"inline-block bg-white border-4 border-black rounded-none",
						"shadow-[2px_2px_0_0_#000]",
						sizeMap.thumb,
					].join(" ")}
				/>
			</span>
			{label && (
				<span className={`uppercase tracking-[0.02em] ${sizeMap.label} ${disabled ? "opacity-60" : ""}`}>
					{label}
				</span>
			)}
		</label>
	);
}
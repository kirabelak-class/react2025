export default function CheckBox({
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
	const boxSize = {
		sm: "w-5 h-5",
		md: "w-6 h-6",
		lg: "w-7 h-7",
	}[size];

	const labelSize = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
	}[size];

	const checkedBg = {
		primary: "peer-checked:bg-orange-500",
		secondary: "peer-checked:bg-emerald-500",
		danger: "peer-checked:bg-red-500",
		neutral: "peer-checked:bg-white",
	}[variant];

	return (
		<label htmlFor={id} className={`inline-flex items-center gap-2 select-none ${className}`}>
			<input
				id={id}
				type="checkbox"
				className="peer sr-only"
				checked={checked}
				onChange={onChange}
				disabled={disabled}
				{...props}
			/>
			<span
				className={[
					"relative inline-block rounded-none border-4 border-black bg-white",
					"shadow-[4px_4px_0_0_#000] transition-[transform,box-shadow,filter] duration-75",
					"peer-hover:brightness-105",
					"peer-active:translate-x-[2px] peer-active:translate-y-[2px] peer-active:shadow-[2px_2px_0_0_#000]",
					"peer-disabled:opacity-60 peer-disabled:pointer-events-none",
					boxSize,
					checkedBg,
				].join(" ")}
				aria-hidden="true"
			>
				<span className="absolute inset-0 grid place-items-center opacity-0 peer-checked:opacity-100 transition-opacity">
					<svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden="true">
						<path d="M1 6L5 10L13 1" stroke="black" strokeWidth="3" />
					</svg>
				</span>
			</span>
			{label && (
				<span className={`uppercase tracking-[0.02em] ${labelSize} ${disabled ? "opacity-60" : ""}`}>
					{label}
				</span>
			)}
		</label>
	);
}
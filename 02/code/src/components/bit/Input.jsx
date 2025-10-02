export default function Input({
	type = "text",
	value,
	onChange,
	placeholder = "",
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
		neutral: "bg-white text-slate-900",
		primary: "bg-orange-50 text-slate-900",
		secondary: "bg-emerald-50 text-slate-900",
		danger: "bg-red-50 text-slate-900",
	};

	const base =
		"w-full font-mono border-4 border-black rounded-none " +
		"placeholder:opacity-70 " +
		"shadow-[0_6px_0_0_#000] hover:brightness-105 " +
		"focus:outline-none focus:translate-y-[2px] focus:shadow-[0_4px_0_0_#000] " +
		"disabled:opacity-60 disabled:pointer-events-none " +
		"transition-[transform,box-shadow,filter] duration-75";

	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			className={`${base} ${sizeMap[size] ?? ""} ${variantMap[variant] ?? ""} ${className}`}
			{...props}
		/>
	);
}
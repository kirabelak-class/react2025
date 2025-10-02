export default function Button({
	children,
	variant = "primary",   
	size = "md",           
	disabled = false,
	className = "",
	type = "button",
	...props
}) {
	const sizeMap = {
		sm: "text-sm px-3 py-2",
		md: "text-base px-4 py-3",
		lg: "text-lg px-5 py-4",
	};

	const variantMap = {
		primary: "bg-orange-500 text-white",
		secondary: "bg-emerald-500 text-slate-900",
		neutral: "bg-white text-slate-900",
		danger: "bg-red-500 text-white",
	};

	const base =
		"inline-block uppercase tracking-[0.02em] border-4 border-black rounded-none " +
		"shadow-[0_6px_0_0_#000] hover:brightness-105 " +
		"active:translate-y-[2px] active:shadow-[0_4px_0_0_#000] " +
		"disabled:opacity-60 disabled:pointer-events-none " +
		"transition-[transform,box-shadow,filter] duration-75";

	return (
		<button
			type={type}
			disabled={disabled}
			className={`${base} ${sizeMap[size] ?? ""} ${variantMap[variant] ?? ""} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
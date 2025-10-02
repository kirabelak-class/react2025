export default function Card({
	as = "section",
	title,
	footer,
	children,
	variant = "neutral", 
	size = "md",        
	interactive = false,
	className = "",
	...props
}) {
	const Tag = as;

	const sizeMap = {
		sm: "p-3 space-y-2",
		md: "p-4 space-y-3",
		lg: "p-6 space-y-4",
	};

	const titleSize = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-lg",
	};

	const variantMap = {
		neutral: "bg-white text-slate-900",
		primary: "bg-orange-50 text-slate-900",
		secondary: "bg-emerald-50 text-slate-900",
		danger: "bg-red-50 text-slate-900",
	};

	const base =
		"border-4 border-black rounded-none " +
		"shadow-[6px_6px_0_0_#000] " +
		"transition-[transform,box-shadow,filter] duration-75";

	const interactiveCls = interactive
		? "hover:brightness-105 hover:shadow-[3px_3px_0_0_#000] active:translate-x-[3px] active:translate-y-[3px]"
		: "";

	return (
		<Tag
			className={`${base} ${sizeMap[size]} ${variantMap[variant]} ${interactiveCls} ${className}`}
			{...props}
		>
			{title && (
				<div className="flex items-center justify-between">
					<h3 className={`uppercase tracking-[0.02em] font-bold ${titleSize[size]}`}>
						{title}
					</h3>
				</div>
			)}

			<div>{children}</div>

			{footer && (
				<div className="pt-2">{footer}</div>
			)}
		</Tag>
	);
}
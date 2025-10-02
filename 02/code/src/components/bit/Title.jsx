export default function Title({
    as="h1",
    children,
    size="xl",
    variant="primary",
    align="center",
    className="",
    ...props
}){
    const Tag=as

    const sizeMap={
        sm:"text-lg",
        md:"text-2xl md:text-2xl",
        lg:"text-2xl md:text-3xl"
    }

    const variantMap={
        primary:"bg-orange-500 text-white",
		secondary: "bg-emerald-500 text-slate-900",
		neutral: "bg-white text-slate-900",
		danger: "bg-red-500 text-white",
    }

    const alignMap = {
		left: "text-left",
		center: "text-center",
		right: "text-right",
	};

    const base =
		"inline-block uppercase tracking-[0.02em] px-4 py-3 border-4 border-black rounded-none " +
		"shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] " +
		"active:translate-x-[3px] active:translate-y-[3px] " +
		"transition-[transform,box-shadow] duration-75";
    return(
        <Tag className={`${base}  ${sizeMap[size] ?? ""} ${variantMap[variant] ?? ""} ${alignMap[align] ?? ""} ${className}`} {...props}>
            {children}
        </Tag>
    )
}
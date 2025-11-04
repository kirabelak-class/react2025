import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";

const ProductSchema = v.object({
	title: v.pipe(
		v.string(),
		v.minLength(3, "El título debe tener al menos 3 caracteres")
	),
	price: v.pipe(
		v.string(),
		v.regex(/^\d+(\.\d{1,2})?$/, "El precio debe ser un número"),
		v.transform(Number),
		v.minValue(0.01, "El precio debe ser mayor a 0")
	),
	category: v.string(),
	stock: v.pipe(
		v.string(),
		v.regex(/^\d+$/, "El stock debe ser un número"),
		v.transform(Number),
		v.minValue(0, "El stock debe ser mayor o igual a 0")
	),
});

const StoreCatalogSchema=v.object({
    producto:ProductSchema,
    items:v.optional(v.array(ProductSchema))
})

export default function RHFStoreCatalog() {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty, isSubmitSuccessful, isValid },
	} = useForm({
		resolver: valibotResolver(StoreCatalogSchema),
		defaultValues: {
			producto: {
				title: "",
				price: "",
			},
			items: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "items",
	});

	const watchedItems = useWatch({
		control,
		name: "items",
	});

	const onSubmit = (data) => {
		console.log("Producto Valido", data);
		alert("Producto creado con exito");
		reset();
	};

	return (
		<main className="max-w-3xl mx-auto p-6 space-y-6">
			<div className="border-b pb-4">
				<h1 className="text-3xl font-bold">Store Catalog</h1>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="grid md:grid-cols-2 gap-4">
					{/* TITLE */}
					<label>
						Title <span className="text-red-500">*</span>
					</label>
					<input
						{...register("producto.title")}
						placeholder="Ej: Monster"
						className={`border w-full rounded h-10 px-3 ${
							errors.producto?.title ? "border-red-500" : ""
						}`}
					/>
					{errors.producto?.title && (
						<p className="text-red-600 text-sm mt-1">
							{errors.producto.title.message}
						</p>
					)}

					{/* PRICE */}
					<label>
						Price <span className="text-red-500">*</span>
					</label>
					<input
						{...register("producto.price")}
						placeholder="Ej: 1.99"
						className={`border w-full rounded h-10 px-3 ${
							errors.producto?.price ? "border-red-500" : ""
						}`}
					/>
					{errors.producto?.price && (
						<p className="text-red-600 text-sm mt-1">
							{errors.producto.price.message}
						</p>
					)}

					{/* Category */}
					<label>
						Category <span className="text-red-500">*</span>
					</label>
					<input
						{...register("producto.category")}
						placeholder="Ej: Energetic"
						className={`border w-full rounded h-10 px-3 ${
							errors.producto?.category ? "border-red-500" : ""
						}`}
					/>
					{errors.producto?.category && (
						<p className="text-red-600 text-sm mt-1">
							{errors.producto.category.message}
						</p>
					)}

					{/* stock */}
					<label>
						Stock <span className="text-red-500">*</span>
					</label>
					<input
						{...register("producto.stock")}
						placeholder="Ej: 2"
						className={`border w-full rounded h-10 px-3 ${
							errors.producto?.stock ? "border-red-500" : ""
						}`}
					/>
					{errors.producto?.stock && (
						<p className="text-red-600 text-sm mt-1">
							{errors.producto.stock.message}
						</p>
					)}
				</div>
				<button type="submit" className="hover:bg-amber-300">
					Agregar producto
				</button>
			</form>
		</main>
	);
}

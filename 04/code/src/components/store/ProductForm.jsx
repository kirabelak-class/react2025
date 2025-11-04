import { useForm, useFieldArray } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ProductSchema } from "../../schemas/productShema";
import ImageFieldArray from "./ImageFieldArray";

export default function ProductForm({
	selectedProduct,
	onSubmit,
	onCancel,
	categories,
	loading,
}) {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: valibotResolver(ProductSchema),
		defaultValues: selectedProduct || {
			title: "",
			price: "",
			category: "",
			stock: "",
			images: [""],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "images",
	});
	return (
		<div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
			<h2 className="font-semibold text-xl mb-6">
				{selectedProduct ? "editar producto" : "+ Crear producto"}
			</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">
						Titulo <span className="text-red-500">*</span>
					</label>
					<input
						{...register("title")}
						className={`border w-full rounded h-10 px-3 ${
							errors.title ? "border-red-500" : ""
						}`}
					/>
					{errors.title && (
						<p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
					)}
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-1">
							Precio <span className="text-red-500">*</span>
						</label>
						<input
							{...register("price")}
							type="number"
							step="0.01"
							placeholder="999.99"
							className={`border w-full rounded h-10 px-3 ${
								errors.price ? "border-red-500" : ""
							}`}
						/>
						{errors.price && (
							<p className="text-red-600 text-sm mt-1">
								{errors.price.message}
							</p>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">
							Stock <span className="text-red-500">*</span>
						</label>
						<input
							{...register("stock")}
							type="number"
							placeholder="100"
							className={`border w-full rounded h-10 px-3 ${
								errors.stock ? "border-red-500" : ""
							}`}
						/>
						{errors.stock && (
							<p className="text-red-600 text-sm mt-1">
								{errors.stock.message}
							</p>
						)}
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Categoría <span className="text-red-500">*</span>
					</label>
					<select
						{...register("category")}
						className={`border w-full rounded h-10 px-3 ${
							errors.category ? "border-red-500" : ""
						}`}
					>
						<option value="">Seleccionar categoría</option>
						{categories.map((cat) => (
							<option key={cat.slug} value={cat.slug}>
								{cat.name}
							</option>
						))}
					</select>
					{errors.category && (
						<p className="text-red-600 text-sm mt-1">
							{errors.category.message}
						</p>
					)}
				</div>
				<ImageFieldArray
					fields={fields}
					register={register}
					append={append}
					remove={remove}
				/>
				{errors.images && (
					<p className="text-red-600 text-sm">{errors.images.message}</p>
				)}
				<div className="flex gap-2">
					<button
						type="submit"
						disabled={loading}
						className="flex-1 bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 disabled:opacity-50"
					>
						{loading
							? "Procesando"
							: selectedProduct
							? "Actualizar"
							: "+ Crear"}
					</button>
					{selectedProduct && (
						<button
							type="submit"
                            onClick={onCancel}
							className="px-4 bg-gray-400 text-white rounded hover:bg-gray-500"
						>
							X
						</button>
					)}
				</div>
			</form>
		</div>
	);
}

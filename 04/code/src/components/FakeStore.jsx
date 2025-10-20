import * as v from "valibot";
import { useState, useRef } from "react";
import { mapIssues } from "../utils/mapIssues";

const ProductSchema = v.object({
	title: v.pipe(
		v.string(),
		v.minLength(3, "El título debe tener al menos 3 caracteres")
	),
	price: v.pipe(
		v.string(),
		v.regex(/^\d+(\.\d{1,2})?$/, "Debe ser un número válido"),
		v.transform(Number),
		v.minValue(0.01, "El precio debe ser mayor a 0")
	),
	category: v.pipe(
		v.string(),
		v.minLength(1, "Debes seleccionar una categoría")
	),
	description: v.pipe(
		v.string(),
		v.minLength(20, "La descripción debe tener al menos 20 caracteres")
	),
	image: v.pipe(
		v.string(),
		v.url("Debe ser una URL válida"),
		v.regex(
			/\.(jpg|jpeg|png|gif|webp)$/i,
			"La URL debe terminar en jpg, png, gif o webp"
		)
	),
	terms: v.pipe(
		v.boolean(),
		v.literal(true, "Debes aceptar los términos y condiciones")
	),
});

const ProductResponseSchema = v.object({
	id: v.number(),
	title: v.string(),
	price: v.number(),
	description: v.string(),
	image: v.pipe(v.string(), v.url()),
	category: v.string(),
});

const categories = [
	"electronics",
	"jewelery",
	"men's clothing",
	"women's clothing",
];

export default function FakeStore() {
	const [data, setData] = useState({
		title: "",
		price: "",
		category: "",
		description: "",
		image: "",
		terms: false,
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [createdProduct, setCreatedProduct] = useState(null);

	const titleRef = useRef(null);
	const priceRef = useRef(null);
	const categoryRef = useRef(null);
	const descriptionRef = useRef(null);
	const imageRef = useRef(null);
	const termsRef = useRef(null);

	const inputRefs = {
		title: titleRef,
		price: priceRef,
		category: categoryRef,
		description: descriptionRef,
		image: imageRef,
		terms: termsRef,
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setData({
			...data,
			[name]: type === "checkbox" ? checked : value,
		});
		setSuccessMessage("");
		if (errors[name]) {
			setErrors({ ...errors, [name]: undefined });
		}
	};

	const focusFirstError = (errorFields) => {
		const firstErrorField = Object.keys(errorFields)[0];
		const ref = inputRefs[firstErrorField];
		if (ref?.current) {
			ref.current.focus();
			ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const result = v.safeParse(ProductSchema, data);
		if (!result.success) {
			const mappedErrors = mapIssues(result.issues);
			setErrors(mappedErrors);
			focusFirstError(mappedErrors);
			return;
		}
		setErrors({});
		setLoading(true);
		try {
			const response = await fetch("https://fakestoreapi.com/products", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: result.output.title,
					price: result.output.price,
					description: result.output.description,
					image: result.output.image,
					category: result.output.category,
				}),
			});
			if (!response.ok) {
				throw new Error(
					`Error ${response.status}: No se pudo crear el producto`
				);
			}
			const apiData = await response.json();
			const apiResult = v.safeParse(ProductResponseSchema, apiData);
			if (!apiResult.success) {
				console.error("Errores de validación de la API:", apiResult.issues);
				throw new Error("La respuesta de la API no tiene el formato esperado");
			}
			setSuccessMessage("Producto creado");
			setCreatedProduct(apiResult.output);

			setData({
				title: "",
				price: "",
				category: "",
				description: "",
				image: "",
				terms: false,
			});
		} catch (error) {
			setErrors({
				submit: error.message || "Error al crear el producto",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto space-y-4 p-4">
			<h1 className="text-2xl font-bold">Crear Producto</h1>
			<form onSubmit={onSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">
						Título del producto <span className="text-red-500">*</span>
					</label>
					<input
						ref={titleRef}
						type="text"
						name="title"
						value={data.title}
						onChange={handleChange}
						placeholder="Ej: iPhone 14 Pro Max"
						className={`border w-full rounded px-3 h-10 ${
							errors.title ? "border-red-500 focus:ring-red-500" : ""
						}`}
					/>
					{errors.title && (
						<p className="text-red-600 text-sm mt-1 flex items-center gap-1">
							{errors.title}
						</p>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Precio (USD) <span className="text-red-500">*</span>
					</label>
					<input
						ref={priceRef}
						type="text"
						name="price"
						value={data.price}
						onChange={handleChange}
						placeholder="Ej: 999.99"
						className={`border w-full rounded px-3 h-10 ${
							errors.price ? "border-red-500 focus:ring-red-500" : ""
						}`}
					/>
					{errors.price && (
						<p className="text-red-600 text-sm mt-1 flex items-center gap-1">
							{errors.price}
						</p>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Categoría <span className="text-red-500">*</span>
					</label>
					<select
						ref={categoryRef}
						name="category"
						value={data.category}
						onChange={handleChange}
						className={`border w-full rounded px-3 h-10 ${
							errors.category ? "border-red-500 focus:ring-red-500" : ""
						}`}
					>
						<option value="">Selecciona una categoría</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat.charAt(0).toUpperCase() + cat.slice(1)}
							</option>
						))}
					</select>
					{errors.category && (
						<p className="text-red-600 text-sm mt-1 flex items-center gap-1">
							{errors.category}
						</p>
					)}
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Descripción <span className="text-red-500">*</span>
					</label>
					<textarea
						ref={descriptionRef}
						name="description"
						value={data.description}
						onChange={handleChange}
						placeholder="Describe tu producto (mínimo 20 caracteres)"
						rows={4}
						className={`border w-full rounded px-3 py-2 ${
							errors.description ? "border-red-500 focus:ring-red-500" : ""
						}`}
					/>
					<div className="flex justify-between items-center mt-1">
						{errors.description ? (
							<p className="text-red-600 text-sm flex items-center gap-1">
								{errors.description}
							</p>
						) : (
							<p className="text-gray-500 text-sm">
								{data.description.length}/20 caracteres mínimo
							</p>
						)}
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						URL de la imagen <span className="text-red-500">*</span>
					</label>
					<input
						ref={imageRef}
						type="url"
						name="image"
						value={data.image}
						onChange={handleChange}
						placeholder="https://example.com/image.jpg"
						className={`border w-full rounded px-3 h-10 ${
							errors.image ? "border-red-500 focus:ring-red-500" : ""
						}`}
					/>
					{errors.image && (
						<p className="text-red-600 text-sm mt-1 flex items-center gap-1">
							{errors.image}
						</p>
					)}
					{data.image && !errors.image && (
						<img
							src={data.image}
							alt="Preview"
							className="mt-2 w-32 h-32 object-cover rounded border"
							onError={(e) => {
								e.target.style.display = "none";
							}}
						/>
					)}
				</div>
				<div>
					<label className="flex items-start gap-2">
						<input
							ref={termsRef}
							type="checkbox"
							name="terms"
							checked={data.terms}
							onChange={handleChange}
							className={`mt-1 ${errors.terms ? "border-red-500" : ""}`}
						/>
						<span className="text-sm">
							Acepto los términos y condiciones{" "}
							<span className="text-red-500">*</span>
						</span>
					</label>
					{errors.terms && (
						<p className="text-red-600 text-sm mt-1 flex items-center gap-1">
							{errors.terms}
						</p>
					)}
				</div>
				{errors.submit && (
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
						{errors.submit}
					</div>
				)}
				{successMessage && (
					<div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
						{successMessage}
					</div>
				)}
				<button
					type="submit"
					className="bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed w-full font-medium hover:bg-blue-700 transition"
					disabled={loading}
				>
					{loading ? (
						<span className="flex items-center justify-center gap-2">
							<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							Creando producto...
						</span>
					) : (
						"Crear Producto"
					)}
				</button>
			</form>
			{createdProduct && (
				<div className="border rounded-lg p-6 bg-gray-50 space-y-3">
					<h3 className="font-bold text-xl text-green-700">
						Producto creado exitosamente
					</h3>
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<img
								src={createdProduct.image}
								alt={createdProduct.title}
								className="w-full h-48 object-cover rounded"
							/>
						</div>
						<div className="space-y-2">
							<p>
								<strong>ID:</strong> {createdProduct.id}
							</p>
							<p>
								<strong>Título:</strong> {createdProduct.title}
							</p>
							<p>
								<strong>Precio:</strong> ${createdProduct.price}
							</p>
							<p>
								<strong>Categoría:</strong> {createdProduct.category}
							</p>
							<p>
								<strong>Descripción:</strong> {createdProduct.description}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

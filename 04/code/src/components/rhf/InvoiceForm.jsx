import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import * as v from "valibot";

const InvoiceSchema = v.object({
	cliente: v.object({
		name: v.pipe(
			v.string(),
			v.minLength(3, "El nombre debe tener al menos 3 caracteres")
		),
		rfc: v.pipe(
			v.string(),
			v.regex(
				/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/,
				"RFC inválido (Ej: XAXX010101000)"
			)
		),
	}),
	items: v.pipe(
		v.array(
			v.object({
				concepto: v.pipe(v.string(), v.minLength(3, "Minimo 3 caracteres")),
				cantidad: v.pipe(
					v.string(),
					v.regex(/^\d+$/, "Solo números"),
					v.transform(Number),
					v.minValue(1, "Minimo uno")
				),
				precio: v.pipe(
					v.string(),
					v.regex(/^\d+(\.\d{1,2})?$/, "Precio inválido"),
					v.transform(Number),
					v.minValue(0.01, "Debe ser mayor a 0")
				),
			})
		),
		v.minLength(1, "Debe haber al menos un item")
	),
});

export default function InvoiceForm() {
	const {
		control,
		register,
		handleSubmit,
		reset
		formState: { errors, isDirty,isSubmitSuccessful,isValid },
	} = useForm({
		resolver: valibotResolver(InvoiceSchema),
		defaultValues: {
			cliente: {
				name: "",
				rfc: "",
			},
			items: [{ concepto: "", cantidad: "", precio: "" }],
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

	const subtotal = watchedItems.reduce((sum, item) => {
		const cantidad = parseFloat(item?.cantidad) || 0;
		const precio = parseFloat(item?.precio) || 0;
		return sum + cantidad * precio;
	}, 0);

	const iva = subtotal * 0.16;
	const total = subtotal + iva;

	const onSubmit = (data) => {
		console.log("Factura valida", data);
		alert("Factura creada con exito");
		reset()
	};
	return (
		<main className="max-w-3xl mx-auto p-6 space-y-6">
			<div className="border-b pb-4">
				<h1 className="text-3xl font-bold">Nueva Factura</h1>
				<p className="text-gray-600 text-sm mt-1">
					Completa los datos del cliente y de los productos
				</p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
					<h2 className="font-semibold text-lg">Datos del cliente</h2>
					<div className="grid md:grid-cols-2 gap-4">
						<div>
							<label>
								{" "}
								Nombre del cliente <span className="text-red-500">*</span>
							</label>
							<input
								{...register("cliente.name")}
								placeholder="Ej: Kaleb Rodriguez"
								className={`border w-full rounded h-10 px-3 ${
									errors.cliente?.name ? "border-red-500" : ""
								}`}
							/>
							{errors.cliente?.name && (
								<p className="text-red-600 text-sm mt-1">
									{errors.cliente.name.message}
								</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">
								RFC <span className="text-red-500">*</span>
							</label>
							<input
								{...register("cliente.rfc")}
								placeholder="XAXX010101000"
								className={`border w-full rounded h-10 px-3 uppercase ${
									errors.cliente?.rfc ? "border-red-500" : ""
								}`}
								maxLength={13}
							/>
						</div>
						{errors.cliente?.rfc && (
							<p className="text-red-600 text-sm mt-1">
								{" "}
								{errors.cliente.rfc.message}{" "}
							</p>
						)}
						<p className="text-xs text-gray-500 mt-1">
							Formato: 3-4 letras + 6 dígitos + 3 caracteres
						</p>
					</div>
				</div>
				<div className="bg-gray-50 border rounded-lg p-4 space-y-3">
					<div className="flex justify-between items-center">
						{" "}
						<h2 className="font-semibold text-lg">Productos/Servicios</h2>{" "}
						<span className="text-sm text-gray-600">
							{" "}
							{fields.length} item(s){" "}
						</span>{" "}
					</div>
					<div className="space-y-2">
						<div className="hidden md:grid md:grid-cols-12 gap-2 text-sm font-medium text-gray-600 pb-2 border-b">
							<div className="col-span-5">Concepto</div>
							<div className="col-span-2">Cantidad</div>
							<div className="col-span-3">Precio Unit.</div>
							<div className="col-span-2">Acción</div>
						</div>
						{fields.map((field, index) => {
							const itemCantidad =
								parseFloat(watchedItems[index]?.cantidad) || 0;
							const itemPrecio = parseFloat(watchedItems[index]?.precio) || 0;
							const itemSubtotal = itemCantidad * itemPrecio;
							return (
								<div key={field.id} className="space-y-2">
									<div className="grid md:grid-cols-12 gap-2">
										<div className="col-span-12 md:col-span-5">
											<input
												{...register(`items.${index}.concepto`)}
												placeholder="Descripción del producto/servicio"
												className={`border w-full rounded h-10 px-3 ${
													errors.items?.[index]?.concepto
														? "border-red-500"
														: ""
												}`}
											/>
											{errors.items?.[index]?.concepto && (
												<p className="text-red-600 text-xs mt-1">
													{errors.items[index].concepto.message}
												</p>
											)}
										</div>

										<div className="col-span-6 md:col-span-2">
											<input
												{...register(`items.${index}.cantidad`)}
												type="number"
												min="1"
												placeholder="Cant."
												className={`border w-full rounded h-10 px-3 ${
													errors.items?.[index]?.cantidad
														? "border-red-500"
														: ""
												}`}
											/>
											{errors.items?.[index]?.cantidad && (
												<p className="text-red-600 text-xs mt-1">
													{errors.items[index].cantidad.message}
												</p>
											)}
										</div>
										<div className="col-span-6 md:col-span-3">
											<input
												{...register(`items.${index}.precio`)}
												type="number"
												step="0.01"
												min="0.01"
												placeholder="Precio"
												className={`border w-full rounded h-10 px-3 ${
													errors.items?.[index]?.precio ? "border-red-500" : ""
												}`}
											/>
											{errors.items?.[index]?.precio && (
												<p className="text-red-600 text-xs mt-1">
													{errors.items[index].precio.message}
												</p>
											)}
										</div>
										<div className="col-span-12 md:col-span-2 flex gap-2">
											{" "}
											<button
												type="button"
												onClick={() => remove(index)}
												disabled={fields.length === 1}
												className="flex-1 bg-red-500 text-white rounded h-10 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{" "}
												X{" "}
											</button>{" "}
										</div>
									</div>
									{itemSubtotal > 0 && (
										<div className="text-right text-sm text-gray-600">
											Subtotal:{" "}
											<span className="font-semibold">
												${itemSubtotal.toFixed(2)}
											</span>
										</div>
									)}
								</div>
							);
						})}
					</div>
					{errors.items && typeof errors.items.message === "string" && (
						<p className="text-red-600 text-sm"> {errors.items.message}</p>
					)}
					<button
						type="button"
						onClick={() => append({ concepto: "", cantidad: "", precio: "" })}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
					>
						+ Añadir item
					</button>
				</div>
				<div className="bg-gradient-to-br from-emerald-50 to-emerald-300 border border-emerald-400 rounded-lg p-6 space-y-3">
					<h2 className="font-semibold text-lg text-emerald-800">
						Resumen de la factura
					</h2>
					<div className="flex justify-between text-gray-700">
						<span>Subtotal:</span>
						<span className="font-mono text-xl">${subtotal.toFixed(2)}</span>
					</div>
					<div className="flex justify-between text-gray-700">
						<span>Iva(16%):</span>
						<span className="font-mono text-xl">${iva.toFixed(2)}</span>
					</div>
					<div className="border-t-2 border-emerald-300 pt-2 flex justify-between items-center">
						<span className="text-xl font-bold text-emerald-800">Total:</span>
						<span className="text-3xl font-bold text-emerald-700">
							${total.toFixed(2)}
						</span>
					</div>
				</div>
				{watchedItems.length > 1 && (
					<div className="text-sm text-gray-600 bg-white rounded p-2">
						<p>{watchedItems.length} items en la factura</p>
					</div>
				)}
				<button
					type="submit"
					className="bg-emerald-600 text-white px-6 py-3 rounded-lg w-full hover:bg-emerald-700 transition font-semibold text-lg"
				>
					Generar factura
				</button>
			</form>
		</main>
	);
}

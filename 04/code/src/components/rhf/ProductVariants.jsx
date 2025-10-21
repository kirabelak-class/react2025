import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { title, variant } from "valibot";

export default function ProductVariants() {
	const { control, register, handleSubmit } = useForm({
		defaultValues: {
			title: "",
			variants: [{ name: "", price: "" }],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: "variants",
	});

    const watchedVariants = useWatch({
        control,
        name:"variants",
    })

    const total= watchedVariants.reduce((sum,variant)=>{
        const price= parseFloat(variant?.price)||0;
        return sum+price
    },0)

    const validVariants = watchedVariants.filter(v=>v?.price && parseFloat(v.price)>0).length;

	const onSubmitt = (data) => console.log(data);

	return (
		<main className="max-w-lg mx-auto p-6 space-y-4">
			<h1 className="text-2xl font-bold">Producto con variantes </h1>
			<form onSubmit={handleSubmit(onSubmitt)} className="space-y-3">
				<input
					type="text"
					placeholder="titulo del producto"
					{...register("title")}
					className="border w-full rounded h-10 px-3"
				/>
				<div className="space-y-2">
					{fields.map((f, i) => (
						<div key={f.id} className="grid grid-cols-12 gap-2">
							<input
								{...register(`variants.${i}.name`)}
								className="col-span-6 border rounded h-10 px-3"
								placeholder="Nombre"
							/>
							<input
								{...register(`variants.${i}.price`)}
								className="col-span-4 border rounded h-10 px-3"
								placeholder="Precio"
							/>
							<button
								type="button"
								onClick={() => remove(i)}
								className="col-span-2 bg-red-500 text-white rounded"
							>
								X
							</button>
						
						</div>
					))}
				</div>
				<button
					type="button"
					onClick={() => append({ name: "", price: "" })}
					className="bg-sky-500 text-white px-3 py-2 rounded"
				>
					+ Añadir Variante
				</button>
                <div className="bg-gray-50 border rounded-lg p-4 space-y-2">
                    <h3 className="font-semibold text-lg">Resumen dinamico</h3>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Variantes totales:</span>
                        <span className="font-medium">{fields.length}</span>
                    </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Variantes con precio:</span>
                        <span className="font-medium">{validVariants}</span>
                    </div>
                     <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                        <span >total:</span>
                        <span className="font-medium text-emerald-700">${total.toFixed(2)}</span>
                    </div>
                </div>
				<button
					type="submit"
					className="bg-emerald-600 text-white px-4 py-2 rounded w-full"
				>
					Guardar
				</button>
			</form>
		</main>
	);
}

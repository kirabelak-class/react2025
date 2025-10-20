import { useForm } from "react-hook-form";

export default function Basic() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();

	const onSubmit = async (data) => {
		await new Promise((r) => setTimeout(r, 800));
		alert(JSON.stringify(data, null, 2));
	};

	return (
		<main className="max-w-md mx-auto p-6 space-y-3">
			<h1 className="text-2xl font-bold">Formulario basico</h1>
			<form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
				<label className="block">
					Nombre
					<input
						className="border w-full h-10 px-3 rounded"
						{...register("name", { required: "Nombre requerido" })}
					/>
					{errors.name && (
						<p className="text-red-600 text-sm">{errors.name.message}</p>
					)}
				</label>
				<label className="block">
					Email
					<input
						type="email"
						className="border w-full h-10 px-3 rounded"
						{...register("email", { required: "Email requerido" })}
					/>
					{errors.email && (
						<p className="text-red-600 text-sm">{errors.email.message}</p>
					)}
				</label>
				<button
					disabled={isSubmitting}
					className="bg-sky-600 text-white px-4 py-2 rounded"
				>
					{isSubmitting ? "Enviando..." : "Enviar"}
				</button>
			</form>
		</main>
	);
}

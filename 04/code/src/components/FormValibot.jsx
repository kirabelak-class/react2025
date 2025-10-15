import { useState } from "react";
import * as v from "valibot";

const UserSchema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(2, "El nombre es muy corto"),
		v.regex(/^\S+$/, "El nombre no debe contener espacios")
	),
	age: v.pipe(
		v.number("La edad debe ser un número"),
		v.minValue(18, "Debe ser mayor de edad")
	),
	email: v.pipe(v.string(), v.email("Correo electrónico inválido")),
});

export default function FormValibot() {
	const [values, setValues] = useState({ name: "", age: "", email: "" });
	const [errors, setErrors] = useState({});
	const [success, setSuccess] = useState(false);

	const onChange = (e) => {
		const { name, value } = e.target;
		setValues((v) => ({ ...v, [name]: value }));
		// limpiar error del campo al escribir
		setErrors((prev) => {
			if (!prev[name]) return prev;
			const next = { ...prev };
			delete next[name];
			return next;
		});
	};
	const onSubmit = (e) => {
		e.preventDefault();
		setSuccess(false);

		const parsed = v.safeParse(UserSchema, {
			...values,
			age: Number(values.age),
		});
		if (!parsed.success) {
			const newErrors = {};
			parsed.issues.forEach((issue) => {
				// Valibot usa path con segmentos; el primero suele tener { key }
				const first = issue.path?.[0];
				const field = typeof first === "object" && first !== null ? first.key : first;
				if (field) newErrors[field] = issue.message;
			});
			setErrors(newErrors);
			return;
		}
		setErrors({});
		setSuccess(true);
		console.log("Datos validados correctamente:", parsed.output);
	};
	return (
		<main className="max-w-md mx-auto p-6 space-y-4">
			<h1 className="text-2xl font-semibold">Formulario con Valibot</h1>
			<form onSubmit={onSubmit} className="space-y-3">
				{/* Nombre */}
				<label className="block space-y-1">
					<span className="text-sm text-zinc-700">Nombre</span>
					<input
						name="name"
						value={values.name}
						onChange={onChange}
						placeholder="Ej. JuanPerez"
						className={`w-full h-10 rounded-xl border px-3 ${
							errors.name
								? "border-red-500 focus-visible:ring-red-500"
								: "border-zinc-300 focus-visible:ring-sky-500"
						} focus-visible:outline-none focus-visible:ring-2`}
					/>
					{errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
				</label>

				{/* Edad */}
				<label className="block space-y-1">
					<span className="text-sm text-zinc-700">Edad</span>
					<input
						type="number"
						name="age"
						value={values.age}
						onChange={onChange}
						placeholder="Ej. 21"
						className={`w-full h-10 rounded-xl border px-3 ${
							errors.age
								? "border-red-500 focus-visible:ring-red-500"
								: "border-zinc-300 focus-visible:ring-sky-500"
						} focus-visible:outline-none focus-visible:ring-2`}
					/>
					{errors.age && <p className="text-sm text-red-600">{errors.age}</p>}
				</label>

				{/* Email */}
				<label className="block space-y-1">
					<span className="text-sm text-zinc-700">Correo electrónico</span>
					<input
						type="email"
						name="email"
						value={values.email}
						onChange={onChange}
						placeholder="correo@ejemplo.com"
						className={`w-full h-10 rounded-xl border px-3 ${
							errors.email
								? "border-red-500 focus-visible:ring-red-500"
								: "border-zinc-300 focus-visible:ring-sky-500"
						} focus-visible:outline-none focus-visible:ring-2`}
					/>
					{errors.email && (
						<p className="text-sm text-red-600">{errors.email}</p>
					)}
				</label>

				<button
					type="submit"
					className="w-full h-10 rounded-xl bg-sky-600 text-white hover:bg-sky-700"
				>
					Enviar
				</button>
			</form>
			{success && (
				<div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4">
					<p className="text-green-700 font-medium">
						{" "}
						Datos enviados correctamente
					</p>
				</div>
			)}
		</main>
	);
}

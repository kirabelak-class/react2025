import { useState } from "react";
import Input from "../ui/Input";

const init = { name: "", email: "", password: "", terms: false };

export default function RegisterControlled() {
	const [values, setValues] = useState(init);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);

	const onChange = (e) => {
		const { name, value, type, checked } = e.target;
		setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
	};

	const validate = () => {
		const e = {};
		if (!values.name.trim()) e.name = "Nombre requerido";
		if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Email invalido";
		if (values.password.length < 6) e.password = "Minimo 6 caracteres";
		if (!values.terms) e.terms = "Debes de aceptar los tèrminos";
		setErrors(e);
		return Object.keys(e).length === 0;
	};

	const onSubmit = async (ev) => {
		ev.preventDefault();
		if (!validate()) return;
		setLoading(true);
		setDone(false);
		//va la funcion real a api o para guardar los datos
		await new Promise((r) => setTimeout(r, 1000));
		setLoading(false);
		setDone(true);
		setValues(init);
	};

	return (
		<main className="max-w-md mx-auto p-6 space-y-4">
			<h1 className="text-2xl font-semibold">Regitro</h1>
			<form onSubmit={onSubmit} className="space-y-3">
				<Input
					label="Nombre"
					name="name"
					value={values.name}
					onChange={onChange}
					error={errors.name}
				/>
				<Input
					label="Email"
					name="email"
					type="email"
					value={values.email}
					onChange={onChange}
					error={errors.email}
					autoComplete="email"
				/>
				<Input
					label="Contraseña"
					name="password"
					type="password"
					value={values.password}
					onChange={onChange}
					error={errors.password}
					autoComplete="new-password"
				/>
				<label className="flex items-center gap-2">
					<input
						type="checkbox"
						name="terms"
						checked={values.terms}
						onChange={onChange}
					/>
					<span className={errors.terms ? "text-red-600" : ""}>
						Acepto términos
					</span>
				</label>

				<button
					type="submit"
					disabled={loading}
					className="w-full h-10 rounded-xl bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50"
				>
					{loading ? "Enviando..." : "Crear cuenta"}
				</button>
			</form>
			{done && <p className="text-green-700">¡Cuenta creada con éxito!</p>}
		</main>
	);
}

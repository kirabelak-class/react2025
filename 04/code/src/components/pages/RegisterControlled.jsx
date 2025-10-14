import { useState } from "react";
import Input from "../ui/Input";

const init = {
	name: "",
	username: "",
	email: "",
	password: "",
	country: "",
	bio: "",
	terms: false,
};

export default function RegisterControlled() {
	const [values, setValues] = useState(init);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [done, setDone] = useState(false);
    const [dataDone,setDataDone]=useState({})

	const onChange = (e) => {
		const { name, value, type, checked } = e.target;
		setValues((v) => ({ ...v, [name]: type === "checkbox" ? checked : value }));
	};

	const validate = () => {
		const e = {};
		if (!values.name.trim()) e.name = "Nombre requerido";
		if (!values.username.trim()) e.username = "Usuario requerido";
		if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Email invalido";
		if (values.password.length < 6) e.password = "Minimo 6 caracteres";
		if (!values.country) e.country = "Selecciona un país";
		if (values.bio.length > 150) e.bio = "Máximo 150 caracteres";
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
        setDataDone(values)
		setValues(init);
	};

	const countries = [
		{ value: "", label: "Selecciona un país" },
		{ value: "ar", label: "Argentina" },
		{ value: "cl", label: "Chile" },
		{ value: "mx", label: "México" },
		{ value: "pe", label: "Perú" },
		{ value: "es", label: "España" },
		{ value: "other", label: "Otro" },
	];
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
					label="Usuario"
					name="username"
					value={values.username}
					onChange={onChange}
					error={errors.username}
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
				<label className="block space-y-1">
					<span className="text-sm text-zinc-700"> Pais</span>
					<select
						name="country"
						value={values.country}
						onChange={onChange}
						className={
							"w-full h-10 rounded-xl border px-3 " +
							(errors.country
								? "border-red-500 focus-visible:ring-red-500 "
								: "border-zinc-300 focus-visible:ring-sky-500 ") +
							"bg-white text-zinc-900 placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-2"
						}
					>
						{countries.map((c) => (
							<option key={c.value} value={c.value}>
								{c.label}
							</option>
						))}
						{errors.country && (
							<p className="text-sm text-red-600">{errors.country}</p>
						)}
					</select>
				</label>
				<label className="block space-y-1">
					<span className="text-sm text-zinc-700">Bio</span>
					<textarea
						name="bio"
						value={values.bio}
						onChange={onChange}
						maxLength={150}
						className={
							"w-full rounded-xl border px-3 py-2 min-h-24 " +
							(errors.bio
								? "border-red-500 focus-visible:ring-red-500 "
								: "border-zinc-300 focus-visible:ring-sky-500 ") +
							"bg-white text-zinc-900 placeholder-zinc-400 focus-visible:outline-none focus-visible:ring-2"
						}
						placeholder="Cuéntanos algo sobre ti (máx 150 caracteres)"
					/>
					<div className="flex items-center justify-between">
						{errors.bio ? (
							<p className="text-sm text-red-600">{errors.bio}</p>
						) : (
							<span />
						)}
						<span
							className={
								"text-xs " +
								(values.bio.length > 140 ? "text-orange-600" : "text-zinc-500")
							}
						>
							{values.bio.length}/150
						</span>
					</div>
				</label>
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
			{done && (
				<section className="mt-4 rounded-xl border border-zinc-200 p-4 space-y-1 bg-zinc-50">
					<h2 className="font-semibold">Resumen</h2>
					<p>
						<strong>Nombre:</strong> {dataDone.name}
					</p>
					<p>
						<strong>Usuario:</strong> {dataDone.username}
					</p>
					<p>
						<strong>Email:</strong> {dataDone.email}
					</p>
					<p>
						<strong>País:</strong>{" "}
						{countries.find((c) => c.value === dataDone.country)?.label || "-"}
					</p>
					<p>
						<strong>Bio:</strong> {dataDone.bio || "-"}
					</p>
					<p>
						<strong>Términos aceptados:</strong> {dataDone.terms ? "Sí" : "No"}
					</p>
				</section>
			)}
		</main>
	);
}

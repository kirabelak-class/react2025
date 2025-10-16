import { useState } from "react";
import * as v from "valibot";
import { mapIssues } from "../utils/mapIssues";

const FormSchema = v.object({
	username: v.pipe(
		v.string(),
		v.minLength(3, "Usuario muy corto"),
		v.regex(/^[a-zA-Z0-9-]+$/, "Solo letras, números y guiones")
	),
});

const GitHubUserSchema = v.object({
	login: v.string(),
	id: v.number(),
	avatar_url: v.pipe(v.string(), v.url("Url de avatar invalida")),
	name: v.nullable(v.string()),
	bio: v.nullable(v.string()),
	followers: v.number(),
	following: v.number(),
	location: v.nullable(v.string()),
	company: v.nullable(v.string()),
	blog: v.nullable(v.string()),
	email: v.nullable(v.string()),
	hireable: v.nullable(v.boolean()),
	created_at: v.pipe(
		v.string(),
		v.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, 'Fecha inválida, debe ser tipo "2019-08-30T20:04:01Z"')
	),
	updated_at: v.pipe(
		v.string(),
		v.regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, 'Fecha inválida, debe ser tipo "2019-08-30T20:04:01Z"')
	),
});

export default function ProfileGet() {
	const [values, setValues] = useState({ username: "" });
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [userData, setUserData] = useState(null);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		setUserData(null);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formResult = v.safeParse(FormSchema, values);

		if (!formResult.success) return setErrors(mapIssues(formResult.issues));
		setErrors({});
		setLoading(true);
		try {
			const response = await fetch(
				`https://api.github.com/users/${values.username}`
			);
			if (!response.ok) {
				throw new Error("Usuario no encontrado");
			}
			const data = await response.json();
			const apiResult = v.safeParse(GitHubUserSchema, data);
            console.log("apiresult=>", apiResult)
			if (!apiResult.success) {
				console.error("Errores de validacion de la api", apiResult.issues);
				throw new Error("La respuesta no tiene el formato correcto");
			}

			setUserData(apiResult.output);
		} catch (error) {
			setErrors({ username: error.message });
			setUserData(null);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-sm mx-auto space-y-4">
			<form onSubmit={onSubmit} className="space-y-3">
				<label className="block">
					Usuario de GitHub
					<input
						className="border w-full rounded px-3 h-10"
						name="username"
						value={values.username}
						onChange={onChange}
						placeholder="Ej: octocat"
					/>
					{errors.username && (
						<p className="text-red-600 text-sm">{errors.username}</p>
					)}
				</label>

				<button
					className="bg-sky-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
					disabled={loading}
				>
					{loading ? "Buscando..." : "Buscar"}
				</button>
			</form>
			{userData && (
				<div className="border rounded-lg p-4 space-y-2">
					<img
						src={userData.avatar_url}
						alt={userData.name || userData.login}
						className="w-20 h-20 rounded-full mx-auto"
					/>
					<h2 className="text-xl font-bold text-center">
						{userData.name || "Sin nombre"}
					</h2>
					<p className="text-gray-600 text-center">@{userData.login}</p>

					{userData.bio && <p className="text-sm">{userData.bio}</p>}

					{userData.company && (
						<p className="text-sm text-gray-500">{userData.company}</p>
					)}

					{userData.location && (
						<p className="text-sm text-gray-500">{userData.location}</p>
					)}

					<div className="flex justify-around text-sm pt-2 border-t">
						<span>{userData.followers} seguidores</span>
						<span>{userData.public_repos} repos</span>
					</div>

					<div className="flex justify-around text-sm text-gray-500">
						<span>Siguiendo: {userData.following}</span>
						<span>Gists: {userData.public_gists}</span>
					</div>
				</div>
			)}
		</div>
	);
}

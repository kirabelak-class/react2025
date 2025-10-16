import * as v from "valibot";
import { useState } from "react";
import { mapIssues } from "../utils/mapIssues";

const RegisterSchema = v.pipe(
	v.object({
		username: v.pipe(
			v.string(),
			v.minLength(3, "Mínimo 3 caracteres"),
			v.maxLength(20, "Máximo 20 caracteres"),
			v.regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guion bajo")
		),
		email: v.pipe(v.string(), v.email("Email inválido")),
		password: v.pipe(
			v.string(),
			v.minLength(8, "Mínimo 8 caracteres"),
			v.regex(/[A-Z]/, "Debe tener al menos una mayúscula"),
			v.regex(/[0-9]/, "Debe tener al menos un número")
		),
		confirm: v.string(),
	}),
	v.forward(
		v.check((d) => d.password === d.confirm, "Las contraseñas no coinciden"),
		["confirm"]
	)
);

const RegisterResponseSchema = v.object({
	username: v.string(),
	email: v.pipe(v.string(), v.email("Email inválido en respuesta")),
	password: v.string(),
	id: v.number(),
});

export default function Register() {
	const [data, setData] = useState({
		username: "",
		email: "",
		password: "",
		confirm: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [registeredUser, setRegisteredUser] = useState(null);

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
		setSuccessMessage("");
		setErrors({});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const result = v.safeParse(RegisterSchema, data);
		if (!result.success) return setErrors(mapIssues(result.issues));
		setErrors({});
		setLoading(true);

		try {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/users",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: data.username,
						email: data.email,
						password: data.password,
					}),
				}
			);
			if (!response.ok) {
				throw new Error(
					`Error ${response.status}: No se pudo registrar el usuario`
				);
			}
			const apiData = await response.json();
			const apiResult = v.safeParse(RegisterResponseSchema, apiData);
			if (!apiResult.success) {
				console.error("Errores de validación de la API:", apiResult.issues);
				throw new Error("La respuesta de la API no tiene el formato esperado");
			}

			if (apiResult.output.email !== data.email) {
				console.warn("El email de la respuesta no coincide con el enviado");
			}

			setSuccessMessage("Usuario registado exitosamente");
			setRegisteredUser(apiResult.output);
			setData({ username: "", email: "", password: "", confirm: "" });
		} catch (error) {
			setErrors({
				submit: error.message || "Error al registrar usuario",
			});
		}finally{
            setLoading(false)
        }
	};
    return(
		<div className="max-w-md mx-auto space-y-4">
		<form onSubmit={onSubmit} className="space-y-3">
		  <div>
			<label className="block text-sm font-medium mb-1">Nombre de usuario</label>
			<input 
			  placeholder="Ej: juan_dev" 
			  name="username" 
			  value={data.username}
			  onChange={handleChange} 
			  className="border w-full rounded px-3 h-10" 
			/>
			{errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
		  </div>
  
		  <div>
			<label className="block text-sm font-medium mb-1">Email</label>
			<input 
			  placeholder="tu@email.com" 
			  name="email"
			  type="email"
			  value={data.email}
			  onChange={handleChange} 
			  className="border w-full rounded px-3 h-10" 
			/>
			{errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
		  </div>
  
		  <div>
			<label className="block text-sm font-medium mb-1">Contraseña</label>
			<input 
			  placeholder="Mínimo 8 caracteres" 
			  name="password" 
			  type="password"
			  value={data.password}
			  onChange={handleChange} 
			  className="border w-full rounded px-3 h-10" 
			/>
			{errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
			<p className="text-xs text-gray-500 mt-1">Debe incluir mayúscula y número</p>
		  </div>
  
		  <div>
			<label className="block text-sm font-medium mb-1">Confirmar contraseña</label>
			<input 
			  placeholder="Repite tu contraseña" 
			  name="confirm" 
			  type="password"
			  value={data.confirm}
			  onChange={handleChange} 
			  className="border w-full rounded px-3 h-10" 
			/>
			{errors.confirm && <p className="text-red-600 text-sm mt-1">{errors.confirm}</p>}
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
			className="bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 w-full font-medium"
			disabled={loading}
		  >
			{loading ? "Registrando..." : "Registrar cuenta"}
		  </button>
		</form>
  
		{registeredUser && (
		  <div className="border rounded-lg p-4 bg-gray-50 space-y-2">
			<h3 className="font-bold text-lg">Usuario creado:</h3>
			<div className="space-y-1 text-sm">
			  <p><strong>ID:</strong> {registeredUser.id}</p>
			  <p><strong>Username:</strong> {registeredUser.username}</p>
			  <p><strong>Email:</strong> {registeredUser.email}</p>
			</div>
		  </div>
		)}
	  </div>
    )
}

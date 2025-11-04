import { useState } from "react";

export default function FakeLogin() {
	const [token, setToken] = useState(null);

	const handleLogin = () => {
		const fakeToken = btoa(
			JSON.stringify({
				user: "Kaleb",
				role: "Admin",
				exp: Date.now() + 60_000,
			})
		);
		localStorage.setItem("token", fakeToken);
		setToken(fakeToken);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		setToken(null);
	};

	return (
		<main className="p-6 space-y-3 text-center">
			<h1 className="text-2xl font-bold">Simulación de Login</h1>
			{token ? (
				<>
					<p>Token: {token}</p>
					<button
						onClick={handleLogout}
						className="px-4 py-2 bg-red-500 text-white rounded"
					>
						Cerrar sesión
					</button>
				</>
			) : (
				<button
					onClick={handleLogin}
					className="px-4 py-2 bg-sky-600 text-white rounded"
				>
					Iniciar sesión
				</button>
			)}
		</main>
	);
}

import { useState } from "react";
import "./App.css";
import FakeLogin from "./pages/FakeLogin";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import GitHubLogin from "react-github-login";

function App() {
	const [user, setUser] = useState(null);
	const [provider, setProvider] = useState(null);

	const handleGitHubSuccess = (response) => {
		console.log("GitHub response:", response);

		// Necesitas intercambiar el code por un access_token
		// Esto normalmente se hace en el backend
		fetch(`https://github.com/login/oauth/access_token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
				client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
				code: response.code,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				// Obtener datos del usuario
				return fetch("https://api.github.com/user", {
					headers: {
						Authorization: `Bearer ${data.access_token}`,
					},
				});
			})
			.then((res) => res.json())
			.then((userData) => {
				setUser({
					name: userData.name || userData.login,
					email: userData.email,
					picture: userData.avatar_url,
				});
				setProvider("GitHub");
			})
			.catch((err) => {
				console.error("Error:", err);
				alert("Error al autenticar con GitHub");
			});
	};

	const handleGitHubFailure = (response) => {
		console.error("GitHub error:", response);
		alert("Error al iniciar sesión con GitHub");
	};

	return (
		<main className="p-6 text-center space-y-3">
			{/* <FakeLogin/> */}
			{user ? (
				<div className="space-y-2">
					<img
						src={user.picture}
						alt="avatar"
						className="w-16 h-16 rounded-full mx-auto"
					/>
					<p>{user.name}</p>
					<p className="text-sm text-gray-500">{user.email}</p>
					<span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
						Autenticado con {provider}
					</span>
					<button
						onClick={() => {
							setUser(null);
							setProvider(null);
						}}
						className="px-4 py-2 bg-red-500 text-white rounded"
					>
						Cerrar sesión
					</button>
				</div>
			) : (
				<>
					<GoogleLogin
						onSuccess={(cred) => {
							const decode = jwtDecode(cred.credential);
							console.log(decode);
							setUser(decode);
						}}
						onError={() => alert("Error al iniciar sesión")}
					/>
					<GitHubLogin
						clientId={import.meta.env.VITE_GITHUB_ID}
						onSuccess={handleGitHubSuccess}
						onFailure={handleGitHubFailure}
						redirectUri="http://localhost:5173"
						className="w-full bg-gray-800 flex flex-row flex-nowrap text-white px-4 py-3 rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2"
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
						</svg>
						Continuar con Github
					</GitHubLogin>
				</>
			)}
		</main>
	);
}

export default App;

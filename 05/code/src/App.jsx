import { useState } from "react";
import "./App.css";
import FakeLogin from "./pages/FakeLogin";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function App() {
	const [user, setUser] = useState(null);

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
					<button
						onClick={() => setUser(null)}
						className="px-4 py-2 bg-red-500 text-white rounded"
					>
						Cerrar sesión
					</button>
				</div>
			) : (
				<GoogleLogin
					onSuccess={(cred) => {
						const decode = jwtDecode(cred.credential);
						console.log(decode);
						setUser(decode);
					}}
					onError={() => alert("Error al iniciar sesión")}
				/>
			)}
		</main>
	);
}

export default App;

import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./providers/AuthContex";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate, useNavigate } from "react-router-dom";

function Dashboard() {
	const { user, logout } = useAuth();
	return (
		<div className="p-6">
			<h2 className="text-2xl font-bold">Dashboard</h2>
			<p>Hola, {user.name}</p>
			<button
				onClick={logout}
				className="bg-red-500 text-white px-3 py-1 rounded mt-3"
			>
				Salir
			</button>
		</div>
	);
}

function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();
	return (
		<div className="p-6 space-y-3 text-center">
			<h1 className="text-xl font-bold">Login Simulado</h1>
			<button
				onClick={() => login({ name: "Kaleb", role: "Admin" },
navigate("/dashboard"),
						
				)}
				className="bg-sky-600 text-white px-4 py-2 rounded"
			>
				Iniciar sesión
			</button>
		</div>
	);
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<nav className="flex gap-3 p-3 bg-gray-100">
					<Link to="/">Home</Link>
					<Link to="/dashboard">Dashboard</Link>
				</nav>
				<Routes>
					<Route path="/" element={<h1 className="p-6">Inicio público</h1>} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;

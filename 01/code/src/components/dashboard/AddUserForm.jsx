import { useState } from "react";
import toast from "react-hot-toast";
export default function AddUserForm({ onAdd }) {
	const [name, setName] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmed = name.trim();
		if (!trimmed) return toast.error("Esta vacio");
		onAdd(trimmed);
		setName("");
	};
	return (
		<form
			onSubmit={handleSubmit}
			style={{ display: "flex", gap: "8px", margin: "12px 0" }}
		>
			<input
				type="text"
				placeholder="Nombre del usuario"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
            <button type="submit">Agregar </button>
		</form>
	);
}

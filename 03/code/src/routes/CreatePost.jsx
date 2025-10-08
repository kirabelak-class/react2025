import { useNavigate } from "react-router-dom";

export default function CreatePost() {
	const navigate = useNavigate();

	const handleSave = async () => {
		await new Promise((r) => setTimeout(r, 900));
		navigate("/blog");
	};
	// navigate("/blog",{replace:true});
	navigate(-1);
    navigate(1);

	return (
		<div>
			<h2>Nuevo Post</h2>
			<button onClick={handleSave}>Guardar y volver</button>
		</div>
	);
}

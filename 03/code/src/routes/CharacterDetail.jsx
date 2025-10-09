import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CharacterDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [character, setCharacter] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function load() {
			const res = await fetch(
				`https://thesimpsonsapi.com/api/characters/${id}`
			);
			const data = await res.json();
			setCharacter(data);
			setLoading(false);
		}
		load();
	}, [id]);
	if (loading) return <p className="text-center">Cargando personaje...</p>;
	if (!character) return <p>No se encontró el personaje.</p>;

    return(
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6">
            <img src={character.image} alt={character.name} className="rounded-lg mb-4"/>
            <h2 className="text-2xl font-bold">{character.name}</h2>
            <p className="text-zinc-600 mt-2">{character.description || "Sin descripcion"}</p>
        <button 
            onClick={()=>navigate(-1)}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-xl font-medium"
        >
            {"<-"} Volver
        </button>
        </div>
    )
}

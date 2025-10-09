import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Characters() {
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(true);
    const IMG_BASE = "https://cdn.thesimpsonsapi.com/500"
	useEffect(() => {
		async function load() {
			const res = await fetch("https://thesimpsonsapi.com/api/characters");
			const data = await res.json();
            console.log(data.results)
			setCharacters(data.results);
			setLoading(false);
		}
		load();
	}, []);

    if (loading) return <p className="text-center text-lg">Cargando personajes....</p>

     return(
        <div>
            <h2 className="text-xl font-semibold mb-4">Lista de personajes</h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {characters.map((c)=>(
                    <Link
                        key={c.id}
                        to={`/characters/${c.id}`}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition p-2 text-center border-2 border-amber-300"
                    >
                        <img src={`${IMG_BASE}${c.portrait_path}`} alt={c.name} className="rounded-lg w-full h-32"/>
                        <h3 className="font-medium mt-2">{c.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
     )
}

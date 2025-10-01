import PokemonCard from "./PokemonCard";

export default function PokemonList({ list }) {
	if (!list?.length) return <p>No hay Pokes que mostrar</p>;

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
				gap: 12,
			}}
		>
            {list.map((p)=><PokemonCard key={p.id} p={p}/>)}
        </div>
	);
}

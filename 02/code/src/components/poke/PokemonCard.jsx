export default function PokemonCard({ p }) {
	return (
		<article
			style={{
				border: "1px solid #e5e7eb",
				borderRadius: 12,
				padding: 12,
				textAlign: "center",
			}}
		>
			<img src={p.sprite} alt={p.name} width={96} height={96} />
			<h3 style={{ margin: "8px 0" }}>
				#{p.id} {capitalize(p.name)}
			</h3>
			<p style={{ fontSize: 14, opacity: 0.85 }}>
				Tipos: {p.types?.length ? p.types.join(", ") : "—"}
			</p>
		</article>
	);
}

function capitalize(s) {
	return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

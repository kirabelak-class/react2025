import { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import PokemonList from "./PokemonList";
import Pagination from "./Paginations";
import { Loader, ErrorState, EmptyState } from "./FeedBack";
import {
	fetchPokemonByNameOrId,
	fetchPokemonListDetails,
	fetchPokemonPage,
} from "../../api/poke";

const PAGE_SIZE = 20;

export default function Pokedex() {
	const [mode, setMode] = useState("list");
	const [page, setPage] = useState(1);

	const [items, setItems] = useState([]);
	const [count, setCount] = useState(0);
	const [selected, setSelected] = useState(null);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const cacheRef = useRef(new Map());

	useEffect(() => {
		if (mode !== "list") return;
		const offset = (page - 1) * PAGE_SIZE;

		(async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await fetchPokemonPage(PAGE_SIZE, offset);
				setCount(data.count || 0);
				const detailed = await fetchPokemonListDetails(data.results);
				setItems(detailed);
			} catch (error) {
				setError(error.message || "Error al cargar listado");
			} finally {
				setLoading(false);
			}
		})();
	}, [mode, page]);

	async function handleSearch(term) {
		const key = String(term).trim().toLowerCase();
		if (!key) {
			setSelected(null);
			setMode("list");
			setError(null);
			return;
		}
		if (cacheRef.current.has(key)) {
			setSelected(cacheRef.current.get(key));
			setMode("detail");
			setError(null);
			return;
		}
		try {
			setLoading(true);
			setError(null);
			const p = await fetchPokemonByNameOrId(key);
			cacheRef.current.set(key, p);
			cacheRef.current.set(String(p.id), p);
			setSelected(p);
			setMode("detail");
		} catch (error) {
			setSelected(null);
			setMode("detail");
			setError(error.message || "No se pudo encontrar el Poke");
		} finally {
			setLoading(false);
		}
	}

	const totalPages = useMemo(
		() => Math.max(1, Math.ceil(count / PAGE_SIZE)),
		[count]
	);

	return (
		<main style={{ maxWidth: 980, margin: "24px auto", padding: "0 16px" }}>
			<h1>Pokedex</h1>
			<SearchBar onSearch={handleSearch} onClear={() => handleSearch("")} />

			{loading && <Loader />}
			{error && (
				<ErrorState
					message={error}
					onRetry={() => {
						if (mode === "list") {
							setPage((p) => p);
						} else {
							setError(null);
						}
					}}
				/>
			)}

			{!loading && !error && mode === "list" && (
				<>
					{items.length === 0 ? (
						<EmptyState title="Sin datos" helper="Intenta recargar" />
					) : (
						<PokemonList list={items} />
					)}

					<Pagination
						page={page}
						totalPage={totalPages}
						OnPrev={() => setPage((p) => Math.max(1, p - 1))}
						onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
					/>
					<p style={{ marginTop: 8, fontSize: 12 }}>
						Mostrando {items.length} de {count} — página {page}/{totalPages}
					</p>
				</>
			)}

			{!loading &&
				!error &&
				mode === "detail" &&
				(selected ? (
					<section style={{ marginTop: 12 }}>
						<PokemonList list={[selected]} />
						<button
							style={{ marginTop: 12 }}
							onClick={() => {
								setMode("list");
								setError(null);
							}}
						>
							← Volver al listado
						</button>
					</section>
				) : <EmptyState title="Pokemon no encontrado" helper="Revise el nombre o id"/>)}
		</main>
	);
}

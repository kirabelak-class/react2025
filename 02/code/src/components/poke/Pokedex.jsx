import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
	// const [mode, setMode] = useState("list");
	const [page, setPage] = useState(1);
	const [term, setTerm] = useState("");

	const {
		data: listData,
		error: listError,
		isLoading: listLoading,
		isError: listIsError,
		isFetching: listIsFetching,
	} = useQuery({
		queryKey: ["pokemon", "list", page],
		queryFn: async () => {
			const offset = (page - 1) * PAGE_SIZE;
			const data = await fetchPokemonPage(PAGE_SIZE, offset);
			const detailed = await fetchPokemonListDetails(data.results);
			return { count: data.count || 0, items: detailed };
		},
		keepPreviousData: true,
		staleTime: 30_000,
		enabled: term.trim() === "",
	});

	const {
		data: detailData,
		error: detailError,
		isLoading: detailLoading,
		isError: detailIsError,
		isFetching: detailIsFetching,
	} = useQuery({
		queryKey: ["pokemon", "detail", term.trim().toLowerCase()],
		queryFn: () => fetchPokemonByNameOrId(term),
		enabled: term.trim() !== "", // solo corre si HAY búsqueda
		staleTime: 180_000,
	});

	const totalPages = useMemo(() => {
		if (!listData?.count) return 1;
		return Math.max(1, Math.ceil(listData.count / PAGE_SIZE));
	}, [listData?.count]);

	const handleSearch = (t) => {
		const next = String(t || "")
			.trim()
			.toLowerCase();
		setTerm(next);
	};

    const isListmode=term.trim()===""
    const loading= isListmode? listLoading : detailLoading;
    const error= isListmode ? listError : detailError;
    const isError=isListmode? listIsError: detailIsError;
    const isFetching=isListmode? listIsFetching:detailIsFetching;

	return (
		<main style={{ maxWidth: 980, margin: "24px auto", padding: "0 16px" }}>
			<h1>Pokedex "react query"</h1>
            {isFetching && <small style={{opacity:0.7}}>Actualizando...</small>}
			<SearchBar onSearch={handleSearch} onClear={() => handleSearch("")} />

			{loading && <Loader />}
			{isError && (
				<ErrorState
					message={error?.message}
					onRetry={null}
				/>
			)}

			{!loading && !isError && isListmode && (
				<>
					{!listData?.items?.length ? (
						<EmptyState title="Sin datos" helper="Intenta recargar" />
					) : (
						<PokemonList list={listData.items} />
					)}

					<Pagination
						page={page}
						totalPage={totalPages}
						OnPrev={() => setPage((p) => Math.max(1, p - 1))}
						onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
					/>
					<p style={{ marginTop: 8, fontSize: 12 }}>
            Mostrando {listData?.items?.length ?? 0} de {listData?.count ?? 0} — página {page}/{totalPages}
					</p>
				</>
			)}

			{!loading && !isError && !isListmode &&
				(detailData ? (
					<section style={{ marginTop: 12 }}>
						<PokemonList list={[detailData]} />
						<button
							style={{ marginTop: 12 }}
							onClick={() => handleSearch("")}
						>
							← Volver al listado
						</button>
					</section>
				) : (
					<EmptyState
						title="Pokemon no encontrado"
						helper="Revise el nombre o id"
					/>
				))}
		</main>
	);
}

const BASE = "https://pokeapi.co/api/v2";

// Lista paginada
export async function fetchPokemonPage(limit = 20, offset = 0) {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("No se pudo cargar el listado");
  const data = await res.json(); // { count, next, previous, results: [{name,url}] }
  return data;
}

// Normaliza el detalle al formato que usa la UI
export function normalizePokemon(p) {
  return {
    id: p.id,
    name: p.name,
    sprite: p.sprites?.front_default ?? "",
    types: (p.types ?? []).map((t) => t.type.name),
  };
}

// Trae detalle por nombre o id
export async function fetchPokemonByNameOrId(term) {
  const key = String(term).trim().toLowerCase();
  if (!key) throw new Error("Ingresa un nombre o ID");
  const res = await fetch(`${BASE}/pokemon/${key}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Pokémon no encontrado");
    throw new Error("Error al cargar el Pokémon");
  }
  const data = await res.json();
  return normalizePokemon(data);
}

// A partir del "results" del listado, trae detalles en paralelo
export async function fetchPokemonListDetails(results) {
  const promises = results.map((r) => fetch(r.url).then((res) => res.json()));
  const detailed = await Promise.all(promises);
  return detailed.map(normalizePokemon);
}

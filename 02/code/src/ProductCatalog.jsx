import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listProducts, addProduct, deleteProduct, getCategories } from "./api/products";
import ProductGrid from "./components/ProductGrid";
import ProductForm from "./components/ProductForm";
import Pagination from "./components/ui/Pagination";
import SearchBar from "./components/ui/SearchBar";
import CategorySelect from "./components/ui/CategorySelect";
import Spinner from "./components/ui/Spinner";
import Empty from "./components/ui/Empty";
import ErrorState from "./components/ui/ErrorState";

const LIMIT = 12;

export default function Catalog() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");

  const skip = useMemo(() => (page - 1) * LIMIT, [page]);

  // Categorías
  const cats = useQuery({ queryKey: ["categories"], queryFn: getCategories, staleTime: 5 * 60_000 });

  // Listado principal
  const products = useQuery({
    queryKey: ["products", { q, category, page }],
    queryFn: () => listProducts({ limit: LIMIT, skip, q, category }),
    keepPreviousData: true,
    staleTime: 30_000,
  });

  // Crear
  const createMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });

  // Eliminar
  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((products.data?.total ?? 0) / LIMIT)),
    [products.data?.total]
  );

  // UI
  return (
    <main className="max-w-6xl mx-auto p-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mini catálogo</h1>
        {products.isFetching && <span className="text-sm text-zinc-500">Actualizando…</span>}
      </header>

   
    </main>
  );
}

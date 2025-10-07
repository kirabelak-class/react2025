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

      {/* Controles */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <SearchBar onSearch={(term) => { setQ(term); setPage(1); }} />
        <div className="flex gap-2">
          {cats.isLoading ? (
            <div className="text-sm text-zinc-500">Cargando categorías…</div>
          ) : cats.isError ? (
            <div className="text-sm text-red-600">No se cargaron categorias</div>
          ) : (
            <CategorySelect
              categories={Array.isArray(cats.data) ? cats.data : []}
              value={category}
              onChange={(v) => { setCategory(v); setPage(1); }}
            />
          )}
        </div>
      </div>

      {/* Form crear */}
      <ProductForm onCreate={(payload) => createMutation.mutate(payload)} />

      {/* Listado */}
      {products.isLoading && <Spinner label="Cargando productos..." />}
      {products.isError && (
        <ErrorState
          message={products.error?.message || "Error al cargar"}
          onRetry={() => qc.invalidateQueries({ queryKey: ["products"] })}
        />
      )}

      {!products.isLoading && !products.isError && (
        <>
          {products.data?.products?.length ? (
            <>
              <ProductGrid
                products={products.data.products}
                onDelete={(id) => deleteMutation.mutate(id)}
              />
              <div className="pt-4">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPrev={() => setPage((p) => Math.max(1, p - 1))}
                  onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
                <p className="text-xs text-zinc-500 mt-2">
                  Mostrando {products.data.products.length} de {products.data.total} (página {page}/{totalPages})
                </p>
              </div>
            </>
          ) : (
            <Empty title="Sin productos" helper="Prueba otra búsqueda o categoría." />
          )}
        </>
      )}
    </main>
  );
}

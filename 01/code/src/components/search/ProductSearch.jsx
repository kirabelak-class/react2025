import { useMemo, useState, useCallback } from "react";
import ProductFilters from "./ProductFilters";
import ProductList from "./ProductList";

const PRODUCTS = [
  { id: 1, name: "Teclado Mecánico", price: 120, category: "Periféricos" },
  { id: 2, name: "Mouse Inalámbrico", price: 45, category: "Periféricos" },
  { id: 3, name: "Monitor 27\"", price: 280, category: "Monitores" },
  { id: 4, name: "Laptop Pro 14", price: 1400, category: "Computadoras" },
  { id: 5, name: "SSD NVMe 1TB", price: 95, category: "Almacenamiento" },
  { id: 6, name: "HDD 2TB", price: 60, category: "Almacenamiento" },
  { id: 7, name: "Base Refrigerante", price: 25, category: "Accesorios" },
  { id: 8, name: "Monitor 24\"", price: 190, category: "Monitores" },
  { id: 9, name: "Laptop Air 13", price: 950, category: "Computadoras" },
  { id: 10, name: "Mouse Gamer", price: 70, category: "Periféricos" },
];

export default function ProductSearch() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");
  const [cartCount, setCartCount] = useState(0);

  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map(p => p.category));
    return ["Todas", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return PRODUCTS.filter(p => {
      const byName = !term || p.name.toLowerCase().includes(term);
      const byCat  = cat === "Todas" || p.category === cat;
      return byName && byCat;
    });
  }, [q, cat]);

  const totalVisible = useMemo(() => filtered.length, [filtered]);

  const addToCart = useCallback((product) => {
    setCartCount(c => c + 1);
  }, []);

  const resetFilters = useCallback(() => {
    setQ("");
    setCat("Todas");
  }, []);

  return (
    <section style={{ maxWidth: 720, margin: "24px auto", padding: "0 16px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>🛒 ProductSearch</h1>
        <div>Carrito: <strong>{cartCount}</strong></div>
      </header>

      <ProductFilters
        q={q} onQ={setQ}
        cat={cat} onCat={setCat}
        categories={categories}
        onReset={resetFilters}
      />

      <p style={{ marginBottom: 8 }}>
        Mostrando <b>{totalVisible}</b> de {PRODUCTS.length} productos
        {q || cat !== "Todas" ? " (filtrado)" : ""}.
      </p>

      <ProductList items={filtered} onAdd={addToCart} />
    </section>
  );
}

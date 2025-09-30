export default function ProductFilters({ q, onQ, cat, onCat, categories, onReset }) {
    return(
        <div style={{ display: "grid", gridTemplateColumns: "1fr 240px auto", gap: 8, margin: "12px 0" }}>
            <input value={q} onChange={(e)=> onQ(e.target.value)} placeholder="Busca por nombre" />
            <select value={cat} onChange={(e)=>onCat(e.target.value)}>
                {categories.map((c)=><option key={c} value={c}>{c}</option>)}
            </select>
                <button onClick={onReset}>Limpiar</button>
        </div>
    )
}
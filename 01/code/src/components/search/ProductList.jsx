import ProductItem from "./ProductItem";

export default function ProductList({items, onAdd}){
    if (!items.length) return <p>No hay productos con tu busqueda</p>
    return(
        <ul  style={{ display: "grid", gap: 8, paddingLeft: 0, listStyle: "none" }}>
            {items.map(p=><ProductItem key={p.id} product={p} onAdd={onAdd}/>)}
        </ul>
    )
}
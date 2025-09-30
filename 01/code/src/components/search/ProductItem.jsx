import { memo } from "react";

export default memo(function ProductItem({product, onAdd}){
    return(
        <li>
            <div>
                <strong>{product.name}</strong>
                <div>{product.category}</div>
            </div>
            <span>{product.price}</span>
            <button onClick={()=>onAdd(onAdd)}>Agregar</button>
        </li>
    )
})
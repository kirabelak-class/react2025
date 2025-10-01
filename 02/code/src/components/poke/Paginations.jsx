export default function Pagination({page,totalPage,OnPrev,onNext}){
    return(
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
            <button onClick={OnPrev} disabled={page <=1}> Anterior</button>
            <span>Pagina {page} / {totalPage}</span>
            <button onClick={onNext} disabled={page>=totalPage}> Siguiente</button>
        </div>
    )
}
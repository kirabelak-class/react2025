import toast from "react-hot-toast"
export function Loader({label="Cargando..."}){
    return <p role="status" aria-live="polite">{label}</p>
}

export function ErrorState({message="Ocurrio un error", onRetry}){
    toast.error(message)
    return (
        <div role="alert">
            <p>x {message}</p>
            {onRetry && <button onClick={onRetry}> Reintentar</button>}
        </div>
    )
}

export function EmptyState({title="Sin resultados", helper}){
    return(
        <div>
            <h3>{title}</h3>
            {helper && <p>{helper}</p>}
        </div>
    )
}
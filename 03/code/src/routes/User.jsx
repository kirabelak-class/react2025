import { useParams } from "react-router-dom"
export default function User(){
    const {id}=useParams()

    return <h2>Bienvenido al perfil de usuario con el id {id}</h2>
}
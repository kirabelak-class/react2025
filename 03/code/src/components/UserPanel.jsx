import {useAuth} from "../contex/AuthContext"
import Button from "./Button"

export default function UserPanel(){
    const {user,login,logout}=useAuth()

    return(
        <div className="text-center space-y-4">
            {user?(
                <>
                <p>Hola, {user.name}</p>
                <Button className="bg-red-500" onClick={logout}>Cerrar sesion</Button>
                </>
            ):(<>
            <p>No has iniciado sesión.</p>
          <Button onClick={() => login("Kaleb")}>Iniciar sesión</Button>
            </>)

            }
        </div>
    )
}
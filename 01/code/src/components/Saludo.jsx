export default function Saludo({nombre,edad}) {
    // const nombre = props.nombre
    // const edad=props.edad
    // const {nombre,edad}=props
	return (
		<>
			{" "}
			{nombre && <h2>Hola, {nombre} !</h2>}
            <p>Tienes {edad} </p>
		</>
	);
}

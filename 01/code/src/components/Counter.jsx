import { useState, useEffect } from "react";
import Saludo from "./Saludo";
import toast from "react-hot-toast";
export default function Counter({ nombre }) {
	const [count, setCount] = useState(14);

	useEffect(() => {
		console.log(count);
		toast.loading("Verificar edad");
		if (count > 18) {
			// console.log("Es mayor")
			toast.success("Es Mayor");
		}
		setTimeout(() => {
			toast.dismiss();
		}, 5000);
	}, [count]);

	return (
		<>
			<p>Haz hecho clic {count} veces</p>
			<button onClick={() =>  setCount(count + 1)}> Incrementar</button>
			<Saludo nombre={nombre} edad={count} />
            {count >15 &&
                <p>Es mayor a 15</p>
            }
		</>
	);
}
